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
  }

  public ngOnInit(): void {
    this.getLines();
    this.LineArray = new Array();
    this.Key = new Array();
    this.Errors = new Array();
    this.Keys = new Array();
  }

  public ngAfterViewInit(): void {
    this._f.onlyAlphanumeric(this.line);
    this._f.event(this.code, 'keypress', e => {
      const theEvent = e || window.event;
      const key = String.fromCharCode(theEvent.keyCode || theEvent.which);
      const regex = /^[A-Za-z0-9\s]+$/;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
        if (key === ',') e.target.value += ', ';
      }
    });
  }

  private getLines = () => this._arrivals.getLines().subscribe(res => {
    if (res.data) {
      let cont = new Array();
      res.data.forEach(e => cont.push(e._id));
      this.LineArray = cont;
    }
  }, err => console.log(<any>err));

  public search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 1 ? [] : this.LineArray.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
  );

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
    this.Key = [];
  }

  public onSubmitKey(form, wait, submit): void {
    /* , backdrop: 'static', keyboard: false */
    this.currentModal = this._modal.open(this.descModal, result => (result !== 'cancel' || this.resetLineCode()), dismiss => this.resetLineCode(), { size: 'lg' });
    // let line = this.line.nativeElement.value;
    // if (this.LineArray.includes(line)) {
    //   if (!this.checkbox.nativeElement.checked) {
    //     console.log("AddKeyComponent -> onSubmitKey -> this.Key", this.Key)
    //     this.line.nativeElement.disabled = true;
    //     this.code.nativeElement.disabled = true;
    //     [...new Set(
    //       this.code.nativeElement.value.split(",").map(l => l.trim()).filter(e => e.length < 5 && "" !== e).map(l => {
    //         for (let i = (4 - l.length); i > 0; i--) l = '0' + l;
    //         return l;
    //       })
    //     )].forEach((e: String) => this.Key.push(new Key(void 0, e, line, void 0, !!0)));
    //     if (this.Key.length > 0)
    //       this.currentModal = this._modal.open(this.descModal, result => (result !== 'cancel' || this.resetLineCode()), dismiss => this.resetLineCode(), { size: 'lg' });
    //   } else {

    //   }
    // }
  }

  public onSubmitDesc(): void {
    let valid: Boolean = true;
    this.Key = this.Key.filter(e => !1 === e.config);
    this.Key.forEach(e => e.desc || (valid = !1));
    if (valid) {
      this.Key.map(e => (delete e.config, e)).forEach((k: Key) => {
        document.body.classList.add('waiting');
        this.currentModal.close();
        this._shipping.sendKey(k).subscribe(async res => {
          let ke: Key = res.data;
          await document.body.classList.remove('waiting');
          await this.Keys.push(ke);
        }, err => {
          this.Errors.push(`Error saving ${k.line}${k.code} because: ${err.error}`);
        });
      });
    }
  }

}
