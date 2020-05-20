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

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.getLine(params.get('key'))
      this.idN = Number(params.get('image'));
    });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    let img = null;
    if (image) reader.readAsDataURL(image);
    return new Promise<string | ArrayBuffer>(resolve => {
      reader.addEventListener("load", () => resolve(reader.result), false);
    })
  }

  private getLine = (_id: string) => this._arrivals.getKey(_id).subscribe(async (res: Dkey) => {
    const img = res.data.image.find(i => i.idN === this.idN);
    this.oldImage = new Image(img.idN, img.img, img.publicId, img.status);
    console.log(await this._external.loadImg64(img.img));

    // this._external.imgLoad(img.img).subscribe(async (res: Blob) => {
    //   console.log("EditImageComponent -> privategetLine -> res", await this.createImageFromBlob(res))
    //   // this.editorComponent.editorInstance.addImageObject = await this.createImageFromBlob(res);

    // });
  }, err => this._router.navigate(['home']));
}
