import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOptions, ToastUiImageEditorComponent } from 'ngx-tui-image-editor';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { ExternalService } from 'src/app/services/external.service';
import { Image as Img } from 'src/app/models/image';
import { Dkey, Key } from 'src/app/models/key';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss']
})
export class EditImageComponent implements OnInit {
  private idN: number;
  public Key: Key;
  public oldImage: Img;
  public newImage: Img;
  public config: IOptions;
  @ViewChild(ToastUiImageEditorComponent) editorComponent: ToastUiImageEditorComponent;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _arrivals: ArrivalsService,
    private _external: ExternalService
  ) {
    this.Key = new Key(void 0, void 0, void 0, void 0, void 0, void 0);
    this.oldImage = new Img(void 0, void 0, void 0, void 0);
    this.newImage = new Img(void 0, void 0, void 0, void 0);
    this.config = {
      includeUI: {}
    };
  }

  public ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._route.paramMap.subscribe(params => {
      this.getLine(params.get('key'))
      this.idN = Number(params.get('image'));
    });
  }

  private getLine = (_id: string) => this._arrivals.getKey(_id).subscribe(async (res: Dkey) => {
    this.Key = new Key(res.data._id, res.data.code, res.data.line, res.data.desc, res.data.image, void 0);
    const image = await res.data.image.find(i => i.idN === this.idN);
    this.oldImage = new Img(image.idN, image.img, image.publicId, image.status);
    // console.log(await this._external.loadImg64(image.img));
    this.editorComponent.editorInstance.loadImageFromURL(image.img, res.data.line + res.data.code);
    this.editorComponent.editorInstance.ui.activeMenuEvent();
    // console.log(this.editorComponent.editorInstance.toDataURL({ format: 'jpeg', width: 708, height: 500, quality: 1 }));
    // this.editorComponent.editorInstance.ui.resizeEditor();
  }, err => this._router.navigate(['home']));
}
