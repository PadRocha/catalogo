import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { Key, Dkey } from 'src/app/models/key';
import { ExchangeService } from 'src/app/services/exchange.service';
import { Aline } from 'src/app/models/line';
import { Observable } from 'rxjs';
import { Functions } from 'src/app/functions';

declare const alertify: any;

@Component({
  selector: 'app-edit-key',
  templateUrl: './edit-key.component.html',
  styleUrls: ['./edit-key.component.scss']
})
export class EditKeyComponent implements OnInit {
  public LineArray: Array<string>;
  public oldKey: Key;
  public newKey: Key;
  public status: number;
  public config: SwiperConfigInterface;
  @ViewChild('line') line !: ElementRef;
  @ViewChild('code') code !: ElementRef;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _f: Functions,
    private _arrivals: ArrivalsService,
    private _exchange: ExchangeService
  ) {
    this.LineArray = new Array<string>();
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
    this.getLines();
    this._route.paramMap.subscribe(params => this.getKey(params.get('key')));
  }

  public ngAfterViewInit(): void {
    this._f.onlyAlphanumeric(this.line);
    this._f.onlyAlphanumeric(this.code);
    this._f.event(this.line, 'input', e => {
      const val = e.target.value;
      if (val.length > 5 && !this.LineArray.includes(val)) this.line.nativeElement.classList.add('is-invalid');
      else this.line.nativeElement.classList.remove('is-invalid');
    });
  }

  /*------------------------------------------------------------------*/
  // Query Functions
  /*------------------------------------------------------------------*/

  private getLines = () => this._arrivals.getLines().subscribe((res: Aline) => {
    if (res.data) res.data.forEach(e => this.LineArray.push(e.identifier));
  }, err => console.error(<any>err));

  private getKey = (_id: string) => this._arrivals.getKey(_id)
    .subscribe(async (res: Dkey) => {
      this.oldKey = new Key(res.data._id, res.data.code, res.data.line, res.data.desc, res.data.image.filter(i => i.img), void 0);
      this.newKey = new Key(void 0, res.data.code, res.data.line, res.data.desc, void 0, void 0);
    }, () => this._router.navigate(['home']));

  /*------------------------------------------------------------------*/
  // Event Functions
  /*------------------------------------------------------------------*/

  public search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 1 ? [] : this.LineArray.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
  );

  public onSubmit(form): void {
    document.body.classList.add('wait');
    this._exchange.updateKey(this.oldKey._id, this.newKey).subscribe(async (res: Dkey) => {
      await document.body.classList.remove('wait');
      this.getKey(res.data._id);
      alertify.success(`${res.data.line + res.data.code}<br/>[Actualizo con éxito]`);
    }, err => {
      document.body.classList.remove('wait');
      alertify.error(err.error.message);
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
      alertify.error(err.error.message);
    });
  }
}
