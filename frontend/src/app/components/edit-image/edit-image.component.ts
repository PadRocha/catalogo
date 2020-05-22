import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOptions, ToastUiImageEditorComponent } from 'ngx-tui-image-editor';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { Image as Img } from 'src/app/models/image';
import { Dkey, Key } from 'src/app/models/key';
import { ExchangeService } from 'src/app/services/exchange.service';
import { FunctionsService } from 'src/app/services/functions.service';

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
    private _f: FunctionsService,
    private _arrivals: ArrivalsService,
    private _exchange: ExchangeService
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
      this.getKey(params.get('key'))
      this.idN = Number(params.get('image'));
    });
    this.editorComponent.editorRef.nativeElement.querySelector('.tui-image-editor-header-buttons').lastElementChild.remove();
    this.editorComponent.editorRef.nativeElement.querySelector('.tui-image-editor-header-logo').firstElementChild.src = '../../../assets/image/tui-image-editor-bi.png';
  }

  /*------------------------------------------------------------------*/
  // Query Functions
  /*------------------------------------------------------------------*/

  private getKey(_id: string): void {
    document.body.classList.add('wait');
    this._arrivals.getKey(_id).subscribe(async (res: Dkey) => {
      await document.body.classList.remove('wait');
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
      const filter = this.Key.image.filter(i => i.img);
      this.pre = filter.find(i => i.idN === this.idN - 1)?.idN.toString();
      if (!this.pre && (this.idN - 1) == 1) this.pre = filter.find(i => i.idN === this.idN - 2)?.idN.toString();
      this.next = filter.find(i => i.idN === this.idN + 1)?.idN.toString();
      if (!this.next && (this.idN + 1) == 1) this.next = filter.find(i => i.idN === this.idN + 2)?.idN.toString();
      // console.log(this.editorComponent.editorInstance.toDataURL({ format: 'jpeg', width: 708, height: 500, quality: 1 }));
      // this.editorComponent.editorInstance.ui.resizeEditor();
    }, err => this._router.navigate(['home']));
  }

  /*------------------------------------------------------------------*/
  // Event Functions
  /*------------------------------------------------------------------*/

  public preImage = (): Promise<boolean> => this._router.navigate(['edit/key', this.Key._id, 'image', this.pre]);

  public nextImage = (): Promise<boolean> => this._router.navigate(['edit/key', this.Key._id, 'image', this.next]);

  public onSubmit(): void {
    document.body.classList.add('wait');
    const dataURL = this.editorComponent.editorInstance.toDataURL({ format: 'jpeg', width: 708, height: 500, quality: 1 });
    const blob = this._f.dataURItoBlob(dataURL);
    const fd: any = new FormData();
    fd.append('idN', this.idN);
    fd.append('image', blob, this.Key.line + this.Key.code + '.' + blob.type.split('/')[1]);
    this._exchange.updateImage(this.Key._id, fd).subscribe(async (res: Dkey) => {
      await document.body.classList.remove('wait');
      await this.getKey(res.data._id);
    });
  }
}
