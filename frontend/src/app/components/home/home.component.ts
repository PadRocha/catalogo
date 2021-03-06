import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, ChildActivationStart, Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AuthService } from 'src/app/services/auth.service';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { ShippingService } from 'src/app/services/shipping.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { ModalService } from 'src/app/services/modal.service';
import { User, Iuser } from 'src/app/models/user';
import { Image } from 'src/app/models/image';
import { HttpErrorResponse } from '@angular/common/http';
import { Functions } from '../../functions';
import { Key, Dkey, DAkey } from 'src/app/models/key';
import { Line, DAline } from 'src/app/models/line';

declare const alertify: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private User: User;
  public Keys: Array<Key>;
  private actualKeyPage: number;
  private KeyRegex: string;
  private LineSelected: string;
  public KeysInfo: any;
  public Lines: Array<Line>;
  private actualLinePage: number;
  private LineRegex: boolean;
  public LinesInfo: any;
  public imagePath: any;
  public imageSrc: String | ArrayBuffer;
  public imgMessage: string;
  private Image: Image;
  private idKey: string;
  private nBeforeImage: string;
  private nBeforeClass: string;
  public nImage: number;
  public codeImageModal: string;
  public showImage: Array<Image>;
  private currentHTML: any;
  public resimageModal: boolean;
  public imageId: number;
  private currentModal: any;
  private showSearched: boolean;
  private confirmModalService: any;
  public config: SwiperConfigInterface;
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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _auth: AuthService,
    private _arrivals: ArrivalsService,
    private _shippings: ShippingService,
    private _exchanges: ExchangeService,
    private _f: Functions,
    private _modal: ModalService
  ) {
    this.Image = new Image(void 0, void 0, void 0, void 0);
    this.Keys = new Array<Key>();
    this.KeyRegex = '';
    this.LineSelected = '';
    this.actualLinePage = 1;
    this.Lines = new Array<Line>();
    this.LinesInfo = '';
    this.actualKeyPage = 1;
    this.LineRegex = false;
    this.KeysInfo = {
      percentage: 0,
      status: 0
    };
    this.resimageModal = false;
    this.showSearched = false;
    this.showImage = new Array();
    this.config = {
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
  }

  public ngOnInit(): void {
    this.getUser();
    this._route.paramMap.subscribe(params => {
      const line = params.get('line');
      if (line) {
        this.getKeyLineSelected(line);
      } else this.getKeys();
    })
    this.getLines();
  }

  public ngAfterViewInit(): void {
    this._f.event(this.every, 'click', e => {
      this.actualKeyPage = 1;
      this.Keys = new Array<Key>();
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
    this._f.onlyAlphanumeric(this.search, e => clearTimeout(typingTimer));
    this._f.event(this.search, 'keyup', e => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        const regex = e.target.value;
        if (regex !== '') {
          this.actualKeyPage = 1;
          this.Keys = new Array<Key>();
          this.KeyRegex = '';
          this.getKeyRegex(regex);
        } else {
          this.ifExistKey.nativeElement.className = 'd-none';
          this.actualKeyPage = 1;
          this.Keys = new Array<Key>();
          this.KeyRegex = '';
          this.getKeys();
        }
      }, 500);
    });
    this._f.onlyAlphanumeric(this.searchLine, e => clearTimeout(typingTimer));
    this._f.event(this.searchLine, 'keyup', e => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        const regex = e.target.value;
        if (regex !== '') {
          this.actualLinePage = 1;
          this.Lines = new Array<Line>();
          this.LineRegex = true;
          this.getLinesRegex(regex);
        } else {
          this.ifExistLine.nativeElement.className = 'd-none';
          this.actualLinePage = 1;
          this.Lines = new Array<Line>();
          this.LineRegex = false;
          this.getLines();
        }
      }, 500);
    });
  }

  /*------------------------------------------------------------------*/
  // Query Functions
  /*------------------------------------------------------------------*/

  private getUser = () => this._auth.getUser()
    .subscribe((res: Iuser) => this.User = new User(void 0, res.nickname, void 0, res.role), err => console.error(<any>err));

  private getKeys(): void {
    document.body.classList.add('wait');
    this.waitKey.nativeElement.classList.remove('d-none');
    this._arrivals.getKeysPage(this.actualKeyPage).subscribe(async (res: DAkey) => {
      await this.waitKey.nativeElement.classList.add('d-none');
      await document.body.classList.remove('wait');
      if (res.data) this.Keys = this.Keys.concat(res.data.docs);
      delete res.data.docs;
      this.KeysInfo = res.data;
    }, err => console.error(<any>err));
  }

  private getKeyCode = (id: string) => this._arrivals.getKey(id).subscribe(async (res: Dkey) => {
    if (res.data) {
      this.codeImageModal = await res.data.line + res.data.code;
      let cont = new Array();
      res.data['image'].forEach(e => {
        if (e.status === 5) cont[e.idN] = e;
      });
      this.showImage = await cont.filter(() => { return true });
    }
  }, err => console.error(<any>err));

  private getKeyLineSelected(_id: string): void {
    document.body.classList.add('wait');
    this.waitKey.nativeElement.classList.remove('d-none');
    this._arrivals.getKeysLinePage(_id, this.actualKeyPage).subscribe(async (res: DAkey) => {
      await this.waitKey.nativeElement.classList.add('d-none');
      await document.body.classList.remove('wait');
      if (res.data.docs) this.Keys = this.Keys.concat(res.data.docs);
      this.LineSelected = _id;
      this.search.nativeElement.value = _id;
      delete res.data.docs;
      this.KeysInfo = res.data;
    }, err => console.error(<any>err));
  }

  private getKeyRegex(regex: string): void {
    document.body.classList.add('wait');
    this.waitKey.nativeElement.classList.remove('d-none');
    this._arrivals.getKeysRegexPage(regex, this.actualKeyPage).subscribe(async (res: DAkey) => {
      await document.body.classList.remove('wait');
      await this.waitKey.nativeElement.classList.add('d-none');
      await this.search.nativeElement.blur();
      if (res.data) {
        this.Keys = this.Keys.concat(res.data.docs);
        this.KeyRegex = regex;
        if (res.data.docs.length === 0) this.ifExistKey.nativeElement.className = 'show';
        else this.ifExistKey.nativeElement.className = 'd-none';
      }
      delete res.data.docs;
      this.KeysInfo = res.data;
    }, err => console.error(<any>err));
  }

  private getLines(): void {
    document.body.classList.add('wait');
    this.waitLine.nativeElement.classList.remove('d-none');
    this._arrivals.getLinesPage(this.actualLinePage).subscribe(async (res: DAline) => {
      await this.waitLine.nativeElement.classList.add('d-none');
      await document.body.classList.remove('wait');
      if (res.data) this.Lines = this.Lines.concat(res.data.docs);
      delete res.data.docs;
      this.LinesInfo = res.data;
    }, err => console.error(<any>err));
  }

  private getLinesRegex(regex: string): void {
    document.body.classList.add('wait');
    this.waitLine.nativeElement.classList.remove('d-none');
    this._arrivals.getLinesRegexPage(regex, this.actualLinePage).subscribe(async (res: DAline) => {
      await document.body.classList.remove('wait');
      await this.waitLine.nativeElement.classList.add('d-none');
      await this.searchLine.nativeElement.blur();
      if (res.data) this.Lines = this.Lines.concat(res.data.docs);
      if (res.data.docs.length === 0) this.ifExistLine.nativeElement.className = 'show';
      else this.ifExistLine.nativeElement.className = 'd-none';
      delete res.data.docs;
      this.LinesInfo = res.data;
    }, err => console.error(<any>err));
  }

  /*------------------------------------------------------------------*/
  // Event Functions
  /*------------------------------------------------------------------*/

  public hideMenu(menu): void {
    !menu.classList.contains('hide_menu') ? menu.classList.add('hide_menu') : menu.classList.remove('hide_menu');
  }

  public clickConfig(_id, text): void {
    this.idKey = _id;
    this.codeImageModal = text
    this.currentModal = this._modal.open(this.deleteModal, () => { }, () => { }, { size: 'sm'/* , backdrop: 'static', keyboard: false */ });
  }

  public clickSpan(_id): void {
    this.idKey = _id;
    if (!this.showSearched) {
      this.getKeyCode(this.idKey);
      this.showSearched = true;
      setTimeout(() => {
        this.showSearched = false;
      }, 1000);
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
      document.body.classList.add('wait');
      this.Image.idN = Number(select.name);
      this.Image.status = Number(select.value);
      this._exchanges.updateStatus(_id, this.Image).subscribe(async (res: Dkey) => {
        await document.body.classList.remove('wait');
        if (select.value === '5') select.disabled = true;
        const color = select.options[select.selectedIndex].className;
        let c: any = this.nBeforeClass;
        if (this.nBeforeImage !== '') --this.KeysInfo.status[c];
        select.className = 'form-control btn-sm ' + color;
        ++this.KeysInfo.status[color];
        alertify.success(`Status ${this.Image.status}, Image ${this.Image.idN} - key ${_id}`);
        this.nBeforeImage = select.value;
      }, err => {
        document.body.classList.remove('wait');
        alertify.error('Error Status<br/>[reload]');
      });
    } else if (select.value !== '5') {
      document.body.classList.add('wait');
      this._exchanges.deleteStatus(_id, Number(select.name)).subscribe(async (res: Dkey) => {
        await document.body.classList.remove('wait');
        let c: any = this.nBeforeClass;
        --this.KeysInfo.status[c];
        select.className = 'form-control btn-sm white';
        alertify.success(`Status removed<br/>Image ${Number(select['name'])} - key ${_id}`);
      }, err => {
        document.body.classList.remove('wait');
        alertify.error('Error Status<br/>[reload]');
      });
    }
    select.blur();
  }

  public blurSelect(select, _id, text): void {
    if (select.value === '5') {
      this.idKey = _id;
      this.codeImageModal = text;
      this.currentHTML = select;
      this.nImage = Number(this.currentHTML.name);
      let before = this.nBeforeImage;
      this._modal.open(this.imageModal, result => this.destructImg(), dismiss => {
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
    this.Keys = new Array<Key>();
    this.getKeyLineSelected(line)
  }

  public onScrollLine(e): void {
    this.actualLinePage = +this.actualLinePage + 1;
    !this.LineRegex ? this.getLines() : this.getLinesRegex(e.value);
  }

  /*------------------------------------------------------------------*/
  // init Functions
  /*------------------------------------------------------------------*/

  public allowed(): boolean {
    return this.User.role === 'admin';
  }

  public statusImage(image, id): number {
    if (!image.find(e => e.idN == id)) return 6;
    return image.find(e => e.idN == id).status;
  }

  public statusClass(n: number): string {
    switch (n) {
      case 1: return 'gray';
      case 2: return 'brown';
      case 3: return 'blue';
      case 4: return 'purple';
      case 5: return 'green';
      default: return 'white';
    }
  }

  public disabledImage(n): boolean {
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
    this.showImage = new Array();
    this.currentHTML = undefined;
    this.resimageModal = false;
  }

  public setPercentage(set: boolean, one, two, three): void {
    if (
      (one != '5' && two != '5' && three != '5') ||
      (one == '5' && two != '5' && three != '5') ||
      (one != '5' && two == '5' && three != '5') ||
      (one != '5' && two != '5' && three == '5')
    ) {
      let aux = Math.round(this.KeysInfo.percentage * this.KeysInfo.totalDocs / 100);
      this.KeysInfo.percentage = (set ? ++aux : --aux) * 100 / this.KeysInfo.totalDocs;
    }
  }

  public lowPercentage(one, two, three): void {
    let aux = Math.round(this.KeysInfo.percentage * this.KeysInfo.totalDocs / 100);
    if (one == '5' || two == '5' || three == '5') --aux;
    this.KeysInfo.percentage = aux * 100 / --this.KeysInfo.totalDocs;
  }

  public onSubmitImage(file, warning, danger, success, submit): void {
    const idN = Number(this.currentHTML.name);
    if (!file) warning.classList.remove('d-none');
    else {
      document.body.classList.add('wait');
      const fd: FormData = new FormData();
      fd.append('idN', idN.toString());
      fd.append('image', file, file.name);
      submit.disabled = true;
      this._shippings.sendImage(this.idKey, fd).subscribe(async (res: Dkey) => {
        await document.body.classList.remove('wait');
        await success.classList.remove('d-none');
        let select = this._f.findChidlren(this.tr.toArray(), 'id', this.idKey);
        this.setPercentage(true,
          select.querySelector('select[name="1"]').value,
          select.querySelector('select[name="2"]').value,
          select.querySelector('select[name="3"]').value
        );
        warning.classList.add('d-none');
        danger.classList.add('d-none');
        this.currentHTML.disabled = true;
        this.resimageModal = true;
        let c: any = this.nBeforeClass;
        --this.KeysInfo.status[c];
        this.currentHTML.className = 'form-control btn-sm green';
        ++this.KeysInfo.status.green;
      }, err => {
        document.body.classList.remove('wait');
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
    this.confirmModalService = this._modal.open(this.confirmModal, () => { }, () => { }, { size: 'sm' })
  }

  public editImg(): void {
    this.confirmModalService.close();
    this.currentModal.close();
    this._router.navigate(['edit/key', this.idKey, 'image', this.imageId]);
  }

  public confirmDisplay(confirm): void {
    confirm.classList.remove('d-none');
  }

  public clench(key1, key2, lock): void {
    if (key1.checked && key2.checked) lock.disabled = false;
    else lock.disabled = true;
  }

  public confirmDeleteImg(): void {
    const _id = this.idKey;
    const idN = this.imageId;
    const code = this.codeImageModal;
    document.body.classList.add('wait');
    this._exchanges.deleteImage(_id, idN).subscribe(async (res: Dkey) => {
      await document.body.classList.remove('wait');
      let cont = new Array();
      await res.data['image'].forEach(e => {
        if (e.status == 5) cont.push(e);
      });
      this.getKeyCode(this.idKey);
      if (cont.length <= 1) {
        await this.confirmModalService.close();
        await this.currentModal.close();
        const select = this._f.findChidlren(this.tr.toArray(), 'id', _id);
        this.setPercentage(false,
          select.querySelector('select[name="1"]').value,
          select.querySelector('select[name="2"]').value,
          select.querySelector('select[name="3"]').value
        );
      } else await this.confirmModalService.close();
      let select = this._f.findChidlren(this.tr.toArray(), 'id', _id).querySelector(`select[name='${idN}']`);
      select.className = 'form-control btn-sm white';
      select.value = '';
      select.disabled = false;
      alertify.success(`${code} [id: ${idN}]<br/>[Eliminada con éxito]`);
    }, err => {
      document.body.classList.remove('wait');
      alertify.error(`${code} [id: ${idN}]<br/>[Error]`);
    });
  }

  public editKey(): void {
    this.currentModal.close();
    this._router.navigate(['edit/key', this.idKey]);
  }

  public confirmDeleteKey(): void {
    document.body.classList.add('wait');
    this._exchanges.deleteKey(this.idKey).subscribe(async (res: Dkey) => {
      await document.body.classList.remove('wait');
      let select = this._f.findChidlren(this.tr.toArray(), 'id', this.idKey);
      await select.remove();
      this.lowPercentage(
        select.querySelector('select[name="1"]').value,
        select.querySelector('select[name="2"]').value,
        select.querySelector('select[name="3"]').value
      );
      alertify.success(`${res.data.line + res.data.code}<br/>[Removido con éxito]`);
      this.currentModal.close();
    }, err => {
      document.body.classList.remove('wait');
      alertify.error(`${this.idKey}<br/>[Error]`);
    });
  }
}
