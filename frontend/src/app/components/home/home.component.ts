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

import * as $ from 'jquery';
declare const alertify: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  public Keys: Array<Key>;
  public Lines: Array<Line>;
  public imagePath: any;
  public imageSrc: String | ArrayBuffer;
  public imgMessage: String;
  public Image: Image;
  public idImageModal: String;
  public nBeforeImage: String;
  public nImage: Number;
  public codeImageModal: String;
  public showImage: Array<Image>;
  public selectModal: any;
  // public closeResult: String;
  public resimageModal: Boolean = false;
  private confirmModalService: any;
  @ViewChildren('tr') tr !: QueryList<ElementRef>;
  @ViewChild('imageModal') imageModal: ElementRef;
  @ViewChild('showModal') showModal: ElementRef;
  @ViewChild('confirmModal') confirmModal: ElementRef;

  constructor(
    private _doc: ElementRef,
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
      tr.toArray().forEach(tr => {
        tr = tr.nativeElement;
        let _id = tr.id;
        let select = tr.querySelectorAll('select');
        select.forEach(select => {
          select.addEventListener('focus', e => {
            this.nBeforeImage = select.value;
          });
          select.addEventListener('change', e => {
            if (select.value === '5') {
              this.idImageModal = _id;
              this.getKeyCode(this.idImageModal);
              this.selectModal = select;
              this.nImage = Number(this.selectModal.name) + 1;
              let before = this.nBeforeImage;
              this.open(this.imageModal, result => {
                this.destructImg();
              }, dismiss => {
                if (!this.resimageModal) this.selectModal.value = before;
                this.destructImg();
              });
              this.nBeforeImage = before;
            } else if (select.value !== '') {
              this.Image.id = Number(select.name);
              this.Image.status = Number(select.value);
              this._exchanges.updateStatus(_id, this.Image).subscribe(res => {
                if (select.value === '5') select.disabled = true;
                let color = select.options[select.selectedIndex].className;
                select.className = 'form-control ' + color;
                alertify.success(`Status ${this.Image.status}, Image ${Number(select.name) + 1} - key ${_id}`);
              }, err => {
                alertify.error('Error Status [reload]');
              });
            }
          });
        })
        let span = tr.querySelectorAll('span');
        span.forEach(span => {
          span.addEventListener('click', e => {
            this.idImageModal = _id;
            this.getKeyCode(this.idImageModal);
            if (this.showImage.length > 0) {
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

  public getKeys(): void {
    this._arrivals.getKeys().subscribe(res => {
      if (res.data) {
        this.Keys = res.data;
      }
    }, err => {
      this._auth.verify(err);
      console.log(<any>err);
    });
  }

  public getKeyCode(id: String): void {
    this._arrivals.getKey(id).subscribe(async res => {
      this.codeImageModal = await res.data['line']._id + res.data.code;
      let cont = new Array();
      res.data['image'].forEach(e => {
        if (e.status == 5) cont.push(e);
      });
      this.showImage = await cont;
    }, err => {
      console.log(<any>err);
    });
  }

  public getLines(): void {
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
    if (!image.find(e => e.id == id)) return 6;
    return image.find(e => e.id == id).status;
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

  private open(target, callbackResult, callbackDismiss): void {
    this._modalService.open(target, { size: 'lg', backdrop: 'static' }).result.then((result) => { callbackResult(result); }, (reason) => { callbackDismiss(reason); });
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
    this.selectModal = undefined;
    this.resimageModal = false;
  }

  public onSubmitImage(file, warning, danger, success, submit): void {
    const id = Number(this.selectModal['name']);
    if (!file) warning.classList.remove('d-none');
    else {
      let fd: any = new FormData();
      fd.append('id', id);
      fd.append('image', file, file.name);
      submit.disabled = true;
      this._shippings.updateImage(this.idImageModal, fd).subscribe(async res => {
        await success.classList.remove('d-none');
        warning.classList.add('d-none');
        danger.classList.add('d-none');
        this.selectModal['disabled'] = true;
        this.resimageModal = true;
        var color = $('option:selected', this.selectModal).attr('class');
        $(this.selectModal).attr('class', color).addClass('form-control');
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

  public configImg(): void {
    this.confirmModalService = this._modalService.open(this.confirmModal, { size: 'sm' });
  }

  public deleteImg(confirm): void {
    // this.confirmModalService.close();
    confirm.classList.remove('d-none');
  }
}
