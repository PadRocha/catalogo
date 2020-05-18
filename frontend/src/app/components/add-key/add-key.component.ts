import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Key } from 'src/app/models/key';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { ShippingService } from 'src/app/services/shipping.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-add-key',
  templateUrl: './add-key.component.html',
  styleUrls: ['./add-key.component.scss']
})
export class AddKeyComponent implements OnInit {
  public LineArray: Array<String>;
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
  @ViewChild('descModal') descModal: ElementRef;

  constructor(
    private _type: NgbTypeaheadConfig,
    private _arrivals: ArrivalsService,
    private _shipping: ShippingService,
    private _f: FunctionsService,
    private _modal: ModalService
  ) {
    _type.showHint = true;
    this.LineArray = new Array();
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

  private getLines = () => this._arrivals.getLines().subscribe(res => {
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

  public clickCheckbox(lote): void {
    if (this.checkbox.nativeElement.checked) {
      lote.classList.remove('d-none');
      this.code.nativeElement.value = '';
      this.code.nativeElement.disabled = true;
      this.n1.nativeElement.value = '';
      this.n2.nativeElement.value = '';
      this.select.nativeElement.value = '';
      this.n1.nativeElement.classList.remove('is-invalid');
      this.n2.nativeElement.classList.remove('is-invalid');
      this.invalid1.nativeElement.classList.add('d-none');
      this.invalid2.nativeElement.classList.add('d-none');
      this.n1.nativeElement.focus();
    } else {
      this.code.nativeElement.disabled = false;
      this.code.nativeElement.focus();
      lote.classList.add('d-none');
    }
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
    this.checkbox.nativeElement.checked = false;
    this.n1.nativeElement.value = '';
    this.n2.nativeElement.value = '';
    this.select.nativeElement.value = '';
    this.lote.nativeElement.classList.add('d-none');
  }

  public onSubmitKey(warning, warning2, danger): void {
    /* , backdrop: 'static', keyboard: false */
    const line = this.line.nativeElement.value;
    if (line !== '') {
      warning.classList.add('d-none')
      if (this.LineArray.includes(line)) {
        danger.classList.add('d-none');
        if (!this.checkbox.nativeElement.checked) {
          this.line.nativeElement.disabled = true;
          this.code.nativeElement.disabled = true;
          [...new Set(
            this.code.nativeElement.value.split(",").map(l => l.trim()).filter(e => e.length < 5 && "" !== e).map(l => {
              for (let i = (4 - l.length); i > 0; i--) l = '0' + l;
              return l;
            })
          )].forEach((e: string) => this.Key.push(new Key(void 0, e, line, void 0, void 0, !!0)));
          if (this.Key.length > 0)
            this.currentModal = this._modal.open(this.descModal, result => (result !== 'cancel' || this.resetLineCode()), () => this.resetLineCode(), { size: 'lg' });
        } else {
          let n1 = Number(this.n1.nativeElement.value);
          let n2 = Number(this.n2.nativeElement.value);
          if (n1 > 0 && n2 > 0 && n1 < n2 && n2 < 9999) {
            for (let i: any = n1; i <= n2; i++) {
              i = i.toString();
              for (let j = (4 - i.length); j > 0; j--) i = '0' + i;
              this.Key.push(new Key(void 0, i, line, void 0, void 0, !!0));
            }
            if (this.Key.length > 0)
              this.currentModal = this._modal.open(this.descModal, result => (result !== 'cancel' || this.resetLineCode()), () => this.resetLineCode(), { size: 'lg' });
          } else warning2.classList.remove('d-none');
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
      ? this._shipping.sendKey(k).subscribe(async res => {
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
      : this._shipping.sendKeyStatus(k, Number(this.select.nativeElement.value)).subscribe(async res => {
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
