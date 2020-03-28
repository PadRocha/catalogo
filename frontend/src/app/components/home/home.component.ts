import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AuthService } from 'src/app/services/auth.service';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { ShippingService } from 'src/app/services/shipping.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { ModalService } from 'src/app/services/modal.service';
import { User } from 'src/app/models/user';
import { Image } from 'src/app/models/image';
import { HttpErrorResponse } from '@angular/common/http';
import { FunctionsService } from 'src/app/services/functions.service';

declare const alertify: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private User: User;
  public Keys = [];
  private actualKeyPage: Number;
  private KeyRegex: String = '';
  private LineSelected: String = '';
  public KeysInfo: any;
  public Lines = [];
  private actualLinePage: Number;
  private LineRegex: Boolean = false;
  public LinesInfo: any;
  public imagePath: any;
  public imageSrc: String | ArrayBuffer;
  public imgMessage: String;
  private Image: Image;
  private idKey: String;
  private nBeforeImage: String;
  private nBeforeClass: String;
  public nImage: Number;
  public codeImageModal: String;
  public showImage: Array<Image>;
  private currentHTML: any;
  public resimageModal: Boolean = false;
  public imageId: Number;
  private currentModal: any;
  private showSearched: Boolean = false;
  private confirmModalService: any;
  @ViewChild('imageModal') imageModal: ElementRef;
  @ViewChild('showModal') showModal: ElementRef;
  @ViewChild('confirmModal') confirmModal: ElementRef;
  @ViewChild('deleteModal') deleteModal: ElementRef;
  @ViewChild('every') every: ElementRef;
  @ViewChild('icon') icon: ElementRef;
  @ViewChild('search', { static: true }) search !: ElementRef;
  @ViewChild('searchLine') searchLine: ElementRef;
  @ViewChild('waitLine', { static: true }) waitLine !: ElementRef;
  @ViewChild('ifExistLine') ifExistLine: ElementRef;
  @ViewChild('waitKey', { static: true }) waitKey !: ElementRef;
  @ViewChild('ifExistKey') ifExistKey: ElementRef;
  @ViewChildren('tr') tr !: QueryList<ElementRef>;
  public config: SwiperConfigInterface = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
    }, keyboard: {
      enabled: true,
      onlyInViewport: false
    }
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _auth: AuthService,
    private _arrivals: ArrivalsService,
    private _shippings: ShippingService,
    private _exchanges: ExchangeService,
    private _f: FunctionsService,
    private _modal: ModalService
  ) {
    this.Image = new Image(undefined, undefined, undefined, undefined);
    this.actualLinePage = 1;
    this.actualKeyPage = 1;
  }

  public ngOnInit(): void {
    this.getUser();
    this._route.paramMap.subscribe(params => {
      const line = params.get('line');
      if (line) {
        console.log("HomeComponent -> ngOnInit -> line", line)
        this.getKeyLineSelected(line);
      } else this.getKeys();
    })
    this.getLines();
  }

  public ngAfterViewInit(): void {
    this._f.event(this.every, 'click', e => {
      this.actualKeyPage = 1;
      this.Keys = [];
      this.LineSelected = '';
      this.search.nativeElement.value = '';
      this.getKeys();
    });
    this._f.event(this.icon, 'click', e => {
      const search = this.search.nativeElement;
      if (search.classList.contains('search-anim')) search.classList.remove('search-anim');
      else {
        search.classList.add('search-anim');
        search.focus();
      }
    });
    let typingTimer;
    // this._f.denyAlphanumeric(this.search, e => clearTimeout(typingTimer));
    this._f.event(this.search, 'keyup', e => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        const regex = e.target.value;
        if (regex !== '') {
          this.actualKeyPage = 1;
          this.Keys = [];
          this.KeyRegex = '';
          this.getKeyRegex(regex);
        } else {
          this.ifExistKey.nativeElement.className = 'd-none';
          this.actualKeyPage = 1;
          this.Keys = [];
          this.KeyRegex = '';
          this.getKeys();
        }
      }, 500);
    });
    // this._f.denyAlphanumeric(this.searchLine, e => clearTimeout(typingTimer));
    this._f.event(this.searchLine, 'keyup', e => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        const regex = e.target.value;
        if (regex !== '') {
          this.actualLinePage = 1;
          this.Lines = [];
          this.LineRegex = true;
          this.getLinesRegex(regex);
        } else {
          this.ifExistLine.nativeElement.className = 'd-none';
          this.actualLinePage = 1;
          this.Lines = [];
          this.LineRegex = false;
          this.getLines();
        }
      }, 500);
    });
  }

  /*------------------------------------------------------------------*/
  // Query Functions
  /*------------------------------------------------------------------*/

  private getUser = () => this._auth.getUser().subscribe(res => {
    this.User = res;
  }, err => {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 423) {
        this._router.navigate(['/home']);
      } else if (err.status === 403 || err.status === 409) {
        this._auth.logoutUser();
      }
    }
  });

  private totalStatus(docs: []): Object {
    let info = { white: 0, gray: 0, brown: 0, blue: 0, purple: 0, green: 0 };
    docs.forEach((d: any) => d.image.forEach(i => {
      switch (i.status) {
        case 0: ++info.white; break;
        case 1: ++info.gray; break;
        case 2: ++info.brown; break;
        case 3: ++info.blue; break;
        case 4: ++info.purple; break;
        case 5: ++info.green; break;
        default:
          alertify.error(`Status extra ${d.line + d.code}<br/>[${i.id} No debe existi]`);
          break;
      }
    }));
    return info;
  }

  private getKeys(): void {
    this.waitKey.nativeElement.classList.remove('d-none');
    this._arrivals.getKeysPage(this.actualKeyPage).subscribe(async res => {
      await this.waitKey.nativeElement.classList.add('d-none');
      if (res.data) this.Keys = this.Keys.concat(res.data.docs);
      delete res.data.docs;
      this.KeysInfo = res.data;
    }, err => console.log(<any>err));
  }

  private getKeyCode = (id: String) => this._arrivals.getKey(id).subscribe(async res => {
    if (res.data) {
      this.codeImageModal = await res.data['line']._id + res.data.code;
      let cont = new Array();
      res.data['image'].forEach(e => {
        if (e.status === 5) cont[e.idN] = e;
      });
      this.showImage = await cont.filter(() => { return true });
    }
  }, err => console.log(<any>err));

  private getKeyLineSelected(_id: String): void {
    this.waitKey.nativeElement.classList.remove('d-none');
    this._arrivals.getKeysLinePage(_id, this.actualKeyPage).subscribe(async res => {
      await this.waitKey.nativeElement.classList.add('d-none');
      if (res.data.docs) this.Keys = this.Keys.concat(res.data.docs);
      this.LineSelected = _id;
      this.search.nativeElement.value = _id;
      delete res.data.docs;
      this.KeysInfo = res.data;
    }, err => console.log(<any>err));
  }

  private getKeyRegex(regex: String): void {
    this.waitKey.nativeElement.classList.remove('d-none');
    this._arrivals.getKeysRegexPage(regex, this.actualKeyPage).subscribe(async res => {
      // console.log("HomeComponent -> getKeyRegex -> res", res)
      await this.waitKey.nativeElement.classList.add('d-none');
      if (res.data) {
        this.Keys = this.Keys.concat(res.data.docs);
        this.KeyRegex = regex;
        if (res.data.docs.length === 0) this.ifExistKey.nativeElement.className = 'show';
        else this.ifExistKey.nativeElement.className = 'd-none';
      }
      delete res.data.docs;
      this.KeysInfo = res.data;
    }, err => console.log(<any>err));
  }

  private getLines(): void {
    this.waitLine.nativeElement.classList.remove('d-none');
    this._arrivals.getLinesPage(this.actualLinePage).subscribe(async res => {
      await this.waitLine.nativeElement.classList.add('d-none');
      if (res.data) this.Lines = this.Lines.concat(res.data.docs);
      delete res.data.docs;
      this.LinesInfo = res.data;
    }, err => console.log(<any>err));
  }

  private getLinesRegex(regex: String): void {
    this.waitLine.nativeElement.classList.remove('d-none');
    this._arrivals.getLinesRegexPage(regex, this.actualLinePage).subscribe(async res => {
      await this.waitLine.nativeElement.classList.add('d-none');
      if (res.data) this.Lines = this.Lines.concat(res.data.docs);
      if (res.data.docs.length === 0) this.ifExistLine.nativeElement.className = 'show';
      else this.ifExistLine.nativeElement.className = 'd-none';
      delete res.data.docs;
      this.LinesInfo = res.data;
    }, err => console.log(<any>err));
  }

  /*------------------------------------------------------------------*/
  // Event Functions
  /*------------------------------------------------------------------*/

  public clickConfig(_id, text): void {
    this.idKey = _id;
    this.codeImageModal = text
    this.currentModal = this._modal.open(this.deleteModal, null, null, { size: 'sm'/* , backdrop: 'static', keyboard: false */ });
  }

  public clickSpan(_id): void {
    this.idKey = _id;
    if (!this.showSearched) {
      this.getKeyCode(this.idKey);
      this.showSearched = true;
    }
    if (this.showImage.length > 0) {
      this.showSearched = false;
      this.currentModal = this._modal.open(this.showModal, result => {
        this.destructImg();
      }, dismiss => {
        this.destructImg();
      }, { size: 'lg', backdrop: 'static' })
    }
  }

  public focusSelect(select): void {
    this.nBeforeImage = select.value;
    this.nBeforeClass = select.classList[2];
  }

  public changeSelect(select, _id): void {
    if ((this.nBeforeImage === '' || select.value !== '') && select.value !== '5') {
      this.Image.idN = Number(select.name);
      this.Image.status = Number(select.value);
      this._exchanges.updateStatus(_id, this.Image).subscribe(res => {
        if (select.value === '5') select.disabled = true;
        const color = select.options[select.selectedIndex].className;
        select.className = 'form-control btn-sm ' + color;
        ++this.KeysInfo.status[color];
        let c: any = this.nBeforeClass;
        if (this.nBeforeImage !== '') --this.KeysInfo.status[c];
        alertify.success(`Status ${this.Image.status}, Image ${+this.Image.idN + 1} - key ${_id}`);
        this.nBeforeImage = select.value;
      }, err => {
        alertify.error('Error Status<br/>[reload]');
      });
    } else if (select.value !== '5') this._exchanges.deleteStatus(_id, Number(select.name)).subscribe(res => {
      let c: any = this.nBeforeClass;
      --this.KeysInfo.status[c];
      select.className = 'form-control btn-sm white';
      alertify.success(`Status removed<br/>Image ${Number(select['name']) + 1} - key ${_id}`);
    }, err => {
      alertify.error('Error Status<br/>[reload]');
    });
    select.blur();
  }

  public blurSelect(select, _id, text): void {
    if (select.value === '5') {
      this.idKey = _id;
      this.codeImageModal = text;
      this.currentHTML = select;
      this.nImage = Number(this.currentHTML.name) + 1;
      let before = this.nBeforeImage;
      this._modal.open(this.imageModal, result => {
        this.destructImg();
      }, dismiss => {
        if (!this.resimageModal) this.currentHTML.value = before;
        this.destructImg();
      }, { size: 'lg', backdrop: 'static' });
    }
  }

  public onScrollKey(): void {
    this.actualKeyPage = +this.actualKeyPage + 1;
    if (this.LineSelected === '' && this.KeyRegex === '') this.getKeys();
    else if (this.KeyRegex === '') this.getKeyLineSelected(this.LineSelected);
    else this.getKeyRegex(this.KeyRegex);
  }

  public clickLine(line): void {
    this.actualKeyPage = 1;
    this.Keys = [];
    this.getKeyLineSelected(line)
  }

  public onScrollLine(e): void {
    this.actualLinePage = +this.actualLinePage + 1;
    !this.LineRegex ? this.getLines() : this.getLinesRegex(e.value);
  }

  /*------------------------------------------------------------------*/
  // init Functions
  /*------------------------------------------------------------------*/

  public allowed(): Boolean {
    return this.User.role === 'admin';
  }

  public statusImage(image, id): Number {
    if (!image.find(e => e.idN == id)) return 6;
    return image.find(e => e.idN == id).status;
  }

  public statusClass(n: Number): String {
    switch (n) {
      case 1: return 'gray';
      case 2: return 'brown';
      case 3: return 'blue';
      case 4: return 'purple';
      case 5: return 'green';
      default: return 'white';
    }
  }

  public disabledImage(n): Boolean {
    return n === 5;
  }

  public closeAlert(alert): void {
    alert.classList.add('d-none');
  }

  public destructImg(): void {
    this.imagePath = undefined;
    this.imageSrc = undefined;
    this.imgMessage = undefined;
    this.idKey = undefined;
    this.nImage = undefined;
    this.codeImageModal = undefined;
    this.showImage = undefined;
    this.currentHTML = undefined;
    this.resimageModal = false;
  }

  public setPercentage(set: Boolean): void {
    let aux = Math.round(this.KeysInfo.percentage * this.KeysInfo.totalDocs / 100);
    this.KeysInfo.percentage = (set ? ++aux : --aux) * 100 / this.KeysInfo.totalDocs;
  }

  public lowPercentage(one, two, three): void {
    let aux = Math.round(this.KeysInfo.percentage * this.KeysInfo.totalDocs / 100);
    if (one == '5') --aux;
    else if (two == '5') --aux;
    else if (three == '5') --aux;
    this.KeysInfo.percentage = aux * 100 / --this.KeysInfo.totalDocs;

  }

  public onSubmitImage(file, warning, danger, success, submit): void {
    const idN = Number(this.currentHTML.name);
    if (!file) warning.classList.remove('d-none');
    else {
      let fd: any = new FormData();
      fd.append('idN', idN);
      fd.append('image', file, file.name);
      submit.disabled = true;
      this._shippings.updateImage(this.idKey, fd).subscribe(async res => {
        await success.classList.remove('d-none');
        this.setPercentage(true);
        warning.classList.add('d-none');
        danger.classList.add('d-none');
        this.currentHTML.disabled = true;
        this.resimageModal = true;
        this.currentHTML.className = 'form-control btn-sm green';
        ++this.KeysInfo.status.green;
      }, err => {
        submit.disabled = false;
        danger.classList.remove('d-none');
      });
    }
  }

  public preview(files): void {
    if (files.length === 0) return;
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.imgMessage = 'Only images are supportedsoy gay profe.';
      return;
    }
    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.imageSrc = reader.result;
    }
  }

  public configImg(idN): void {
    this.imageId = idN;
    this.confirmModalService = this._modal.open(this.confirmModal, null, null, { size: 'sm' })
  }

  public editImg(): void {

  }

  public confirmDisplay(confirm): void {
    confirm.classList.remove('d-none');
  }

  public clench(key1, key2, lock): void {
    if (key1.checked && key2.checked) lock.disabled = false;
    else lock.disabled = true;
  }

  public confirmDeleteImg(): void {
    let _id = this.idKey;
    let idN = this.imageId;
    let code = this.codeImageModal;
    this._exchanges.deleteImage(_id, idN).subscribe(async res => {
      let cont = new Array();
      await res.data['image'].forEach(e => {
        if (e.status == 5) cont.push(e);
      });
      this.getKeyCode(this.idKey);
      if (cont.length <= 1) {
        await this.confirmModalService.close();
        await this.currentModal.close();
        this.setPercentage(false);
      } else await this.confirmModalService.close();
      let select = this._f.findChidlren(this.tr.toArray(), 'id', _id).querySelector(`select[name='${idN}']`);
      select.className = 'form-control btn-sm white';
      select.value = '';
      select.disabled = false;
      alertify.success(`${code} [id: ${idN}]<br/>[Eliminada con éxito]`);
    }, err => {
      alertify.error(`${code} [id: ${idN}]<br/>[Error]`);
    });
  }

  public editKey(): void {

  }

  public confirmDeleteKey(): void {
    this._exchanges.deleteKey(this.idKey).subscribe(async res => {
      let select = this._f.findChidlren(this.tr.toArray(), 'id', this.idKey);
      await select.remove();
      console.log()
      this.lowPercentage(
        select.querySelector('select[name="0"]').value,
        select.querySelector('select[name="1"]').value,
        select.querySelector('select[name="2"]').value
      );
      alertify.success(`${res.data.line + res.data.code}<br/>[Removido con éxito]`);
      this.currentModal.close();
    }, err => {
      alertify.error(`${this.idKey}<br/> [Error]`);
    });
  }
}
