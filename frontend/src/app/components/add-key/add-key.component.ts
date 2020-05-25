import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as xlsx from 'xlsx'
import { Key, Ikey, Dkey } from 'src/app/models/key';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { Functions } from '../../functions';
import { ShippingService } from 'src/app/services/shipping.service';
import { ModalService } from 'src/app/services/modal.service';
import { Aline } from 'src/app/models/line';

@Component({
  selector: 'app-add-key',
  templateUrl: './add-key.component.html',
  styleUrls: ['./add-key.component.scss']
})
export class AddKeyComponent implements OnInit {
  public LineArray: Array<string>;
  public Key: Array<Key>;
  public Errors: Array<String>;
  public Keys: Array<Key>;
  private interval: any;
  private currentModal: any;
  @ViewChild('line') line !: ElementRef;
  @ViewChild('code') code !: ElementRef;
  @ViewChild('checkbox') checkbox: ElementRef;
  @ViewChild('lote') lote: ElementRef;
  @ViewChild('n1') n1: ElementRef;
  @ViewChild('n2') n2: ElementRef;
  @ViewChild('invalid1') invalid1: ElementRef;
  @ViewChild('invalid2') invalid2: ElementRef;
  @ViewChild('select') select: ElementRef;
  @ViewChild('excelCheckbox') excelCheckbox: ElementRef;
  @ViewChild('excel') excel: ElementRef;
  @ViewChild('excelField') excelField: ElementRef;
  @ViewChild('excelInvalid') excelInvalid: ElementRef;
  @ViewChild('descModal') descModal: ElementRef;
  @ViewChild('selective') selective: ElementRef;

  constructor(
    private _type: NgbTypeaheadConfig,
    private _arrivals: ArrivalsService,
    private _shipping: ShippingService,
    private _f: Functions,
    private _modal: ModalService
  ) {
    _type.showHint = true;
    this.LineArray = new Array<string>();
    this.Key = new Array<Key>();
    this.Errors = new Array();
    this.Keys = new Array<Key>();
  }

  public ngOnInit(): void {
    this.getLines();
  }

  public ngAfterViewInit(): void {
    this._f.onlyAlphanumeric(this.line);
    this._f.onlyAlphanumeric(this.code, (e, k) => {
      if (k === ',') e.target.value += ', ';
    });
    this._f.event(this.line, 'input', e => {
      const val = e.target.value;
      if (val.length > 5 && !this.LineArray.includes(val)) this.line.nativeElement.classList.add('is-invalid');
      else this.line.nativeElement.classList.remove('is-invalid');
    });
    this._f.onlyNumeric(this.n1);
    this._f.event(this.n1, 'keypress', e => e.target.value.length > 3 && e.preventDefault());
    this._f.onlyNumeric(this.n2);
    this._f.event(this.n2, 'keypress', e => e.target.value.length > 3 && e.preventDefault());
  }

  /*------------------------------------------------------------------*/
  // Query Functions
  /*------------------------------------------------------------------*/

  private getLines = () => this._arrivals.getLines().subscribe((res: Aline) => {
    if (res.data) res.data.forEach(e => this.LineArray.push(e.identifier));
  }, err => console.error(<any>err));

  public search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 1 ? [] : this.LineArray.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
  );

  /*------------------------------------------------------------------*/
  // Event Functions
  /*------------------------------------------------------------------*/

  public closeAlert(alert): void {
    alert.classList.add('d-none');
  }

  public inputNumber(): void {
    clearInterval(this.interval);
    this.interval = setTimeout(() => {
      const n1 = Number(this.n1.nativeElement.value);
      const n2 = Number(this.n2.nativeElement.value);
      if (n1 === 0) {
        this.n1.nativeElement.classList.add('is-invalid');
        this.n2.nativeElement.classList.remove('is-invalid');
        this.invalid1.nativeElement.classList.remove('d-none');
        this.invalid2.nativeElement.classList.add('d-none');
        this.n1.nativeElement.focus();
      } else if (n1 >= n2) {
        this.n1.nativeElement.classList.remove('is-invalid');
        this.n2.nativeElement.classList.add('is-invalid');
        this.invalid1.nativeElement.classList.add('d-none');
        this.invalid2.nativeElement.classList.remove('d-none');
        this.n2.nativeElement.focus();
        this.n2.nativeElement.select();
      } else {
        this.n1.nativeElement.classList.remove('is-invalid');
        this.n2.nativeElement.classList.remove('is-invalid');
        this.invalid1.nativeElement.classList.add('d-none');
        this.invalid2.nativeElement.classList.add('d-none');
      }
    }, 500);
  }

  public selectivo(param = true) {
    this.select.nativeElement.value = '';
    this.lote.nativeElement.classList.add('d-none')
    this.excel.nativeElement.classList.add('d-none');
    if (param) {
      this.code.nativeElement.disabled = false;
      this.code.nativeElement.focus();
    } else {
      this.code.nativeElement.value = '';
      this.code.nativeElement.disabled = true;
    }
  }

  public clickLote(): void {
    this.selectivo(false);
    this.lote.nativeElement.classList.remove('d-none');
    this.n1.nativeElement.value = '';
    this.n2.nativeElement.value = '';
    this.n1.nativeElement.classList.remove('is-invalid');
    this.n2.nativeElement.classList.remove('is-invalid');
    this.invalid1.nativeElement.classList.add('d-none');
    this.invalid2.nativeElement.classList.add('d-none');
    this.excelInvalid.nativeElement.classList.add('d-none');
    this.n1.nativeElement.focus();
  }

  public clickExcel(): void {
    this.selectivo(false);
    this.excel.nativeElement.classList.remove('d-none');
    this.excelField.nativeElement.value = '';
    this.excelInvalid.nativeElement.classList.add('d-none');
    this.excelField.nativeElement.focus();
  }

  public resetLineCode(): void {
    this.line.nativeElement.disabled = false;
    this.code.nativeElement.disabled = false;
    this.Key = new Array<Key>();
  }

  public resetForm(): void {
    this.resetLineCode();
    this.currentModal.close();
    this.line.nativeElement.value = '';
    this.code.nativeElement.value = '';
    this.selective.nativeElement.checked = true;
    this.select.nativeElement.value = '';
    this.lote.nativeElement.classList.add('d-none');
    this.excel.nativeElement.classList.add('d-none');
  }

  private completeCode(l): Ikey {
    for (let i = (4 - l.code.length); i > 0; i--) l.code = '0' + l;
    return l;
  }

  private openModal(): void {
    if (this.Key.length > 0)
      this.currentModal = this._modal.open(this.descModal, result => (result !== 'cancel' || this.resetLineCode()), () => this.resetLineCode(), { size: 'lg' });
  }

  public onSubmitKey(warning, warning2, danger): void {
    /* , backdrop: 'static', keyboard: false */
    const line = this.line.nativeElement.value;
    if (line !== '') {
      warning.classList.add('d-none')
      if (this.LineArray.includes(line)) {
        danger.classList.add('d-none');
        if (this.excelCheckbox.nativeElement.checked) {
          // console.log(this.excelField.nativeElement.files);
          const file = this.excelField.nativeElement.files[0];
          if (file) {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = () => {
              const arrayBuffer: any = fileReader.result;
              const data = new Uint8Array(arrayBuffer);
              const arr = new Array<string>();
              data.forEach(data => arr.push(String.fromCharCode(data)));
              const bstr = arr.join("");
              const workbook = xlsx.read(bstr, { type: "binary" });
              const worksheet = workbook.Sheets[workbook.SheetNames[0]];
              xlsx.utils.sheet_to_json<Ikey>(worksheet, { raw: true })
                .map(k => Object.keys(k).reduce((acc, cur) => (acc[cur] = k[cur].trim(), acc), <Ikey>{}))
                .filter(f => f.desc && f?.code.length < 5 && f?.line.length < 7 && f.line === line)
                .map(l => this.completeCode(l))
                .forEach(k => this.Key.push(new Key(void 0, k.code, k.line, k.desc, void 0, !1)));
              this.openModal();
            }
          } else this.excelInvalid.nativeElement.classList.remove('d-none');
        } else if (this.checkbox.nativeElement.checked) {
          const n1 = Number(this.n1.nativeElement.value);
          const n2 = Number(this.n2.nativeElement.value);
          if (n1 > 0 && n2 > 0 && n1 < n2 && n2 < 9999) {
            for (let i: any = n1; i <= n2; i++) {
              i = i.toString();
              for (let j = (4 - i.length); j > 0; j--) i = '0' + i;
              this.Key.push(new Key(void 0, i, line, void 0, void 0, !1));
            }
            this.openModal();
          } else warning2.classList.remove('d-none');
        } else {
          this.line.nativeElement.disabled = true;
          this.code.nativeElement.disabled = true;
          [...new Set(
            this.code.nativeElement.value.split(",").map(l => l.trim()).filter(e => e.length < 5 && "" !== e).map(l => this.completeCode(l))
          )].forEach((e: string) => this.Key.push(new Key(void 0, e, line, void 0, void 0, !1)));
          this.openModal();
        }
      } else danger.classList.remove('d-none');
    } else warning.classList.remove('d-none');
  }

  public onSubmitDesc(): void {
    document.body.classList.add('wait');
    let valid: Boolean = true;
    this.Key = this.Key.filter(e => !1 === e.config);
    this.Key.forEach(e => e.desc || (valid = !1));
    if (valid) this.Key.map(e => (delete e.config, e)).forEach((k: Key, index, array) => this.select.nativeElement.value == ''
      ? this._shipping.sendKey(k).subscribe(async (res: Dkey) => {
        let ke: Key = res.data;
        await this.Keys.unshift(ke);
        if (index === await array.length - 1) {
          await this.resetForm();
          await document.body.classList.remove('wait');
        }
      }, async err => {
        if (index === await array.length - 1) {
          await document.body.classList.remove('wait');
          await this.resetForm();
        }
        this.Errors.unshift(`Error saving ${k.line + k.code} because: ${err.error.message}`);
      })
      : this._shipping.sendKeyStatus(k, Number(this.select.nativeElement.value)).subscribe(async (res: Dkey) => {
        let ke: Key = res.data;
        await this.Keys.unshift(ke);
        if (index === await array.length - 1) {
          await this.resetForm();
          await document.body.classList.remove('wait');
        }
      }, async err => {
        if (index === await array.length - 1) {
          await document.body.classList.remove('wait');
          await this.resetForm();
        }
        this.Errors.unshift(`Error saving ${k.line + k.code} because: ${err.error.message}`);
      }));
  }

}
