import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOptions, ToastUiImageEditorComponent } from 'ngx-tui-image-editor';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { Image as Img } from 'src/app/models/image';
import { Dkey, Key } from 'src/app/models/key';

export interface ImgElm {
  height: number,
  width: number,
  format: string
}

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss']
})
export class EditImageComponent implements OnInit {
  private idN: number;
  public Key: Key;
  public oldImage: Img;
  public config: IOptions;
  public imageElement: ImgElm;
  public pre?: string;
  public next?: string;
  @ViewChild(ToastUiImageEditorComponent) editorComponent: ToastUiImageEditorComponent;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _arrivals: ArrivalsService
  ) {
    this.Key = new Key(void 0, void 0, void 0, void 0, void 0, void 0);
    this.oldImage = new Img(void 0, void 0, void 0, void 0);
    this.config = { includeUI: {} };
    this.imageElement = {
      width: 0,
      height: 0,
      format: ''
    }
  }

  public ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._route.paramMap.subscribe(params => {
      this.getLine(params.get('key'))
      this.idN = Number(params.get('image'));
    });
    this.editorComponent.editorRef.nativeElement.querySelector('.tui-image-editor-header-buttons').lastElementChild.remove();
    this.editorComponent.editorRef.nativeElement.querySelector('.tui-image-editor-header-logo').firstElementChild.src = '../../../assets/image/tui-image-editor-bi.png';
  }

  /*------------------------------------------------------------------*/
  // Query Functions
  /*------------------------------------------------------------------*/

  private getLine = (_id: string) => this._arrivals.getKey(_id).subscribe(async (res: Dkey) => {
    this.Key = new Key(res.data._id, res.data.code, res.data.line, res.data.desc, res.data.image, void 0);
    const image = await this.Key.image.find(i => i.idN === this.idN);
    this.oldImage = new Img(image.idN, image.img, image.publicId, image.status);
    this.editorComponent.editorInstance.loadImageFromURL(image.img, res.data.line + res.data.code);
    this.editorComponent.editorInstance.ui.activeMenuEvent();
    const i = new Image();
    i.src = image.img;
    i.onload = () => {
      this.imageElement.width = i.width;
      this.imageElement.height = i.height;
      this.imageElement.format = i.src.split('.').pop();
    }
    this.pre = this.Key.image.filter(i => i.img).find(i => i.idN === this.idN - 1)?.idN.toString();
    this.next = this.Key.image.filter(i => i.img).find(i => i.idN === this.idN + 1)?.idN.toString();
    // console.log(this.editorComponent.editorInstance.toDataURL({ format: 'jpeg', width: 708, height: 500, quality: 1 }));
    // this.editorComponent.editorInstance.ui.resizeEditor();
  }, err => this._router.navigate(['home']));

  /*------------------------------------------------------------------*/
  // Event Functions
  /*------------------------------------------------------------------*/

  public preImage = (): Promise<boolean> => this._router.navigate(['edit/key', this.Key._id, 'image', this.pre]);

  public nextImage = (): Promise<boolean> => this._router.navigate(['edit/key', this.Key._id, 'image', this.next]);
}
