import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AuthService } from 'src/app/services/auth.service';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { ShippingService } from 'src/app/services/shipping.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { Key } from 'src/app/models/key';
import { Line } from 'src/app/models/line';
import { Image } from 'src/app/models/image';

declare const alertify: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public Keys: Array<Key>;
  public Lines: Array<Line>;
  public imagePath: any;
  public imageSrc: String | ArrayBuffer;
  public imgMessage: String;
  private Image: Image;
  private idImageModal: String;
  private nBeforeImage: String;
  public nImage: Number;
  public codeImageModal: String;
  public showImage: Array<Image>;
  private currentSelect: any;
  public resimageModal: Boolean = false;
  public imageId: Number;
  private currentModal: any;
  private showSearched: Boolean = false;
  private confirmModalService: any;
  private trElement: Array<any>;
  @ViewChild('imageModal') imageModal: ElementRef;
  @ViewChild('showModal') showModal: ElementRef;
  @ViewChild('confirmModal') confirmModal: ElementRef;
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
    private _auth: AuthService,
    private _modalService: NgbModal,
    private _arrivals: ArrivalsService,
    private _shippings: ShippingService,
    private _exchanges: ExchangeService
  ) {
    this.Image = new Image(undefined, undefined, undefined, undefined);
  }

  public ngOnInit(): void {
    this.getKeys();
    this.getLines();
  }

  public ngAfterViewInit(): void {
    this.tr.changes.subscribe(tr => {
      this.trElement = tr.toArray();
      this.trElement.forEach(tr => {
        tr = tr.nativeElement;
        const _id = tr.id;
        const select = tr.querySelectorAll('select');
        select.forEach(select => {
          select.addEventListener('focus', e => {
            this.nBeforeImage = select.value;
          });
          select.addEventListener('change', e => {
            if (select.value === '5') {
              this.idImageModal = _id;
              this.getKeyCode(this.idImageModal);
              this.currentSelect = select;
              this.nImage = Number(this.currentSelect.name) + 1;
              let before = this.nBeforeImage;
              this.open(this.imageModal, result => {
                this.destructImg();
              }, dismiss => {
                if (!this.resimageModal) this.currentSelect.value = before;
                this.destructImg();
              });
              this.nBeforeImage = before;
            } else if (select.value !== '') {
              this.Image.idN = Number(select.name);
              this.Image.status = Number(select.value);
              this._exchanges.updateStatus(_id, this.Image).subscribe(res => {
                if (select.value === '5') select.disabled = true;
                const color = select.options[select.selectedIndex].className;
                select.className = 'form-control ' + color;
                alertify.success(`Status ${this.Image.status}, Image ${Number(select.name) + 1} - key ${_id}`);
                this.nBeforeImage = select.value;
              }, err => {
                alertify.error('Error Status [reload]');
              });
            } else {
              this._exchanges.deleteStatus(_id, Number(select.name)).subscribe(res => {
                select.className = 'form-control white';
                alertify.success(`Status removed, Image ${Number(select['name']) + 1} - key ${_id}`);
              }, err => {
                alertify.error('Error Status [reload]');
              });
            }
          });
        })
        const span = tr.querySelectorAll('span');
        span.forEach(span => {
          span.addEventListener('click', e => {
            this.idImageModal = _id;
            if (!this.showSearched) {
              this.getKeyCode(this.idImageModal);
              this.showSearched = true;
            }
            if (this.showImage.length > 0) {
              this.showSearched = false;
              this.open(this.showModal, result => {
                this.destructImg();
              }, dismiss => {
                this.destructImg();
              })
            }
          });
        });
      });
    });
  }

  private getKeys(): void {
    this._arrivals.getKeys().subscribe(res => {
      if (res.data) {
        this.Keys = res.data;
      }
    }, err => {
      this._auth.verify(err);
      console.log(<any>err);
    });
  }

  private getKeyCode(id: String): void {
    this._arrivals.getKey(id).subscribe(async res => {
      this.codeImageModal = await res.data['line']._id + res.data.code;
      let cont = new Array();
      res.data['image'].forEach(e => {
        if (e.status === 5) cont[e.idN] = e;
      });
      this.showImage = await cont.filter(() => { return true });
    }, err => {
      console.log(<any>err);
    });
  }

  private getLines(): void {
    this._arrivals.getLines().subscribe(res => {
      if (res.data) {
        this.Lines = res.data;
      }
    }, err => {
      this._auth.verify(err);
      console.log(<any>err);
    });
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

  private open(target, callbackResult, callbackDismiss): any {
    this.currentModal = this._modalService.open(target, { size: 'lg', backdrop: 'static' });
    this.currentModal.result.then((result) => { callbackResult(result); }, (reason) => { callbackDismiss(reason); });
  }

  public closeAlert(alert): void {
    alert.classList.add('d-none');
  }

  public destructImg(): void {
    this.imagePath = undefined;
    this.imageSrc = undefined;
    this.imgMessage = undefined;
    this.idImageModal = undefined;
    this.nImage = undefined;
    this.codeImageModal = undefined;
    this.showImage = undefined;
    this.currentSelect = undefined;
    this.resimageModal = false;
  }

  public onSubmitImage(file, warning, danger, success, submit): void {
    const idN = Number(this.currentSelect.name);
    if (!file) warning.classList.remove('d-none');
    else {
      let fd: any = new FormData();
      fd.append('idN', idN);
      fd.append('image', file, file.name);
      submit.disabled = true;
      this._shippings.updateImage(this.idImageModal, fd).subscribe(async res => {
        await success.classList.remove('d-none');
        warning.classList.add('d-none');
        danger.classList.add('d-none');
        this.currentSelect.disabled = true;
        this.resimageModal = true;
        this.currentSelect.className = 'form-control green';
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
      this.imgMessage = "Only images are supportedsoy gay profe.";
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
    this.confirmModalService = this._modalService.open(this.confirmModal, { size: 'sm' });
  }

  public editImg(): void {

  }

  public deleteImg(confirm): void {
    confirm.classList.remove('d-none');
  }

  public clench(key1, key2, lock): void {
    if (key1.checked && key2.checked) lock.disabled = false;
    else lock.disabled = true;
  }

  public confirmDelete(): void {
    let _id = this.idImageModal;
    let idN = this.imageId;
    let code = this.codeImageModal;
    this._exchanges.deleteImage(_id, idN).subscribe(async res => {
      let cont = new Array();
      await res.data['image'].forEach(e => {
        if (e.status == 5) cont.push(e);
      });
      this.getKeyCode(this.idImageModal);
      if (cont.length <= 1) {
        await this.confirmModalService.close();
        await this.currentModal.close();
      } else await this.confirmModalService.close();
      let select = this.trElement.find(tr => tr.nativeElement.id === _id).nativeElement.querySelector(`select[name="${idN}"]`);
      select.className = 'form-control white';
      select.value = '';
      select.disabled = false;
      alertify.success(`${code} [id: ${idN}] [Eliminada con éxito]`);
    }, err => {

    });
  }
}
