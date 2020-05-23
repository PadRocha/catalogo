import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { Key, Dkey } from 'src/app/models/key';
import { ExchangeService } from 'src/app/services/exchange.service';

declare const alertify: any;

@Component({
  selector: 'app-edit-key',
  templateUrl: './edit-key.component.html',
  styleUrls: ['./edit-key.component.scss']
})
export class EditKeyComponent implements OnInit {
  public oldKey: Key;
  public newKey: Key;
  public status: number;
  public config: SwiperConfigInterface;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _arrivals: ArrivalsService,
    private _exchange: ExchangeService
  ) {
    this.oldKey = new Key(void 0, void 0, void 0, void 0, void 0, void 0);
    this.newKey = new Key(void 0, void 0, void 0, void 0, void 0, void 0);
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
    this._route.paramMap.subscribe(params => this.getKey(params.get('key')));
  }

  /*------------------------------------------------------------------*/
  // Query Functions
  /*------------------------------------------------------------------*/

  private getKey = (_id: string) => this._arrivals.getKey(_id)
    .subscribe(async (res: Dkey) => {
      this.oldKey = new Key(res.data._id, res.data.code, res.data.line, res.data.desc, res.data.image.filter(i => i.img), void 0);
      this.newKey = new Key(void 0, res.data.code, res.data.line, res.data.desc, void 0, void 0);
    }, () => this._router.navigate(['home']));

  /*------------------------------------------------------------------*/
  // Event Functions
  /*------------------------------------------------------------------*/

  public onSubmit(): void {
    document.body.classList.add('wait');
    this._exchange.updateKey(this.oldKey._id, this.newKey).subscribe(async (res: Dkey) => {
      await document.body.classList.remove('wait');
      this.getKey(res.data._id);
      alertify.success(`${res.data.line + res.data.code}<br/>[Actualizo con éxito]`);
    }, err => {
      document.body.classList.remove('wait');
      alertify.error(err.error.message)
    });
  }

  public resetImages(): void {
    document.body.classList.add('wait');
    this._exchange.resetKeyImage(this.oldKey._id, this.status).subscribe(async (res: Dkey) => {
      await document.body.classList.remove('wait');
      this.getKey(res.data._id);
      alertify.success(`${res.data.line + res.data.code}<br/>[Imágenes reiniciadas]`);
    }, err => {
      document.body.classList.remove('wait');
      alertify.error(err.error.message)
    });
  }
}
