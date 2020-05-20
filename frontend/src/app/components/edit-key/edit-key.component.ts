import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { Key } from 'src/app/models/key';

@Component({
  selector: 'app-edit-key',
  templateUrl: './edit-key.component.html',
  styleUrls: ['./edit-key.component.scss']
})
export class EditKeyComponent implements OnInit {
  public oldKey: Key;
  public newKey: Key;
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
    private _arrivals: ArrivalsService
  ) {
    this.oldKey = new Key(void 0, void 0, void 0, void 0, void 0, void 0)
    this.newKey = new Key(void 0, void 0, void 0, void 0, void 0, void 0)
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => this.getLine(params.get('key')));
  }

  private getLine = (_id: string) => this._arrivals.getKey(_id).subscribe(async res => (this.oldKey = new Key(
    res.data._id,
    res.data.code,
    res.data.line,
    res.data.desc,
    res.data.image.filter(i => i.img),
    void 0
  ), this.newKey = new Key(void 0, res.data.code, res.data.line, res.data.desc, void 0, void 0)), err => this._router.navigate(['home']));

  public onSubmit(form): void {
    form.reset();
  }
}
