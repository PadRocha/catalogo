import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { Image } from 'src/app/models/image';
import { ExternalService } from 'src/app/services/external.service';
import { Dkey } from 'src/app/models/key';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss']
})
export class EditImageComponent implements OnInit {
  public idN: number;
  public oldImage: Image;
  public newImage: Image;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _arrivals: ArrivalsService,
    private _external: ExternalService
  ) {
    this.oldImage = new Image(void 0, void 0, void 0, void 0)
    this.newImage = new Image(void 0, void 0, void 0, void 0)
  }

  public
  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.getLine(params.get('key'))
      this.idN = Number(params.get('image'));
    });
  }

  private getLine = (_id: string) => this._arrivals.getKey(_id).subscribe(async (res: Dkey) => {
    const image = res.data.image.find(i => i.idN === this.idN);
    this.oldImage = new Image(image.idN, image.img, image.publicId, image.status);
    console.log(await this._external.loadImg64(image.img));
  }, err => this._router.navigate(['home']));
}
