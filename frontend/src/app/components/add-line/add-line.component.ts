import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { ModalService } from 'src/app/services/modal.service';
import { ShippingService } from 'src/app/services/shipping.service';
import { Line } from 'src/app/models/line';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.scss']
})
export class AddLineComponent implements OnInit {
  private actualLinePage: Number;
  public Line: Line;
  public Lines: Array<Line>;
  public newLines: Array<Line>;
  private LineRegex: Boolean;
  public LinesInfo: any;
  public actualLine: String;
  private currentModal: any;
  @ViewChild('searchLine') searchLine: ElementRef;
  @ViewChild('waitLine', { static: true }) waitLine !: ElementRef;
  @ViewChild('ifExistLine') ifExistLine: ElementRef;
  @ViewChild('deleteModal') deleteModal: ElementRef;

  constructor(
    private _arrivals: ArrivalsService,
    private _shipping: ShippingService,
    private _exchange: ExchangeService,
    private _f: FunctionsService,
    private _modal: ModalService,
    private _router: Router
  ) {
    this.actualLinePage = 1;
    this.Line = new Line(void 0, void 0, void 0);
    this.Lines = new Array();
    this.newLines = new Array();
    this.LinesInfo = '';
    this.actualLine = '';
  }

  public ngOnInit(): void {
    this.getLines();
  }

  public ngAfterViewInit(): void {
    let typingTimer;
    this._f.onlyAlphanumeric(this.searchLine, e => clearTimeout(typingTimer));
    this._f.event(this.searchLine, 'keyup', e => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => {
        const regex = e.target.value;
        if (regex !== '') {
          this.actualLinePage = 1;
          this.Lines = new Array();
          this.LineRegex = true;
          this.getLinesRegex(regex);
        } else {
          this.ifExistLine.nativeElement.className = 'd-none';
          this.actualLinePage = 1;
          this.Lines = new Array();
          this.LineRegex = false;
          this.getLines();
        }
      }, 500);
    });
  }

  /*------------------------------------------------------------------*/
  // Query Functions
  /*------------------------------------------------------------------*/

  private getLines(): void {
    document.body.classList.add('wait');
    this.waitLine.nativeElement.classList.remove('d-none');
    this._arrivals.getLinesTotalKeyPage(this.actualLinePage).subscribe(async res => {
      await this.waitLine.nativeElement.classList.add('d-none');
      await document.body.classList.remove('wait');
      if (res.data) this.Lines = this.Lines.concat(res.data.docs);
      delete res.data.docs;
      this.LinesInfo = res.data;
    }, err => console.error(<any>err));
  }

  private getLinesRegex(regex: String): void {
    document.body.classList.add('wait');
    this.waitLine.nativeElement.classList.remove('d-none');
    this._arrivals.getLinesTotalKeyRegexPage(regex, this.actualLinePage).subscribe(async res => {
      await document.body.classList.remove('wait');
      await this.waitLine.nativeElement.classList.add('d-none');
      await this.searchLine.nativeElement.blur();
      if (res.data) this.Lines = this.Lines.concat(res.data.docs);
      if (res.data.docs.length === 0) this.ifExistLine.nativeElement.className = 'show';
      else this.ifExistLine.nativeElement.className = 'd-none';
      delete res.data.docs;
      this.LinesInfo = res.data;
    }, err => console.error(<any>err));
  }

  /*------------------------------------------------------------------*/
  // Event Functions
  /*------------------------------------------------------------------*/

  public hideMenu(menu): void {
    !menu.classList.contains('hide_menu') ? menu.classList.add('hide_menu') : menu.classList.remove('hide_menu');
  }

  public onScrollLine(e): void {
    this.actualLinePage = +this.actualLinePage + 1;
    !this.LineRegex ? this.getLines() : this.getLinesRegex(e.value);
  }

  public clickConfig(line: Line): void {
    this.actualLine = line.identifier;
    this.currentModal = this._modal.open(this.deleteModal, () => { }, () => { }, { size: 'sm'/* , backdrop: 'static', keyboard: false */ });
  }

  public editLine(): void {
    this.currentModal.close();
    this._router.navigate([`/edit/line/${this.actualLine}`]);
  }

  public viewLine(): void {
    this.currentModal.close();
    this._router.navigate([`/home/${this.actualLine}`]);
  }

  public confirmDisplay(confirm): void {
    confirm.classList.remove('d-none');
  }

  public clench(key1, key2, lock): void {
    if (key1.checked && key2.checked) lock.disabled = false;
    else lock.disabled = true;
  }

  public confirmDeleteLine(): void {
    document.body.classList.add('wait');
    this._exchange.deleteLine(this.actualLine).subscribe(async res => {
      await document.body.classList.remove('wait');
    }, err => {

    });
  }

  public onSubmitLine(form): void {
    document.body.classList.add('wait');
    this._shipping.sendLine(this.Line).subscribe(async res => {
      await document.body.classList.remove('wait');
      await form.reset();
    }, err => {

    });
    // form.reset();
  }
}
