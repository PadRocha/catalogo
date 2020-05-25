import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { Line, Dline } from 'src/app/models/line';

declare const alertify: any;

@Component({
  selector: 'app-edit-line',
  templateUrl: './edit-line.component.html',
  styleUrls: ['./edit-line.component.scss']
})
export class EditLineComponent implements OnInit {
  public oldLine: Line;
  public newLine: Line;
  public status: number;
  @ViewChild('confirmF') confirmF !: ElementRef;
  @ViewChild('kf1') kf1 !: ElementRef;
  @ViewChild('kf2') kf2 !: ElementRef;
  @ViewChild('lockF') lockF !: ElementRef;
  @ViewChild('confirmR') confirmR !: ElementRef;
  @ViewChild('kr1') kr1 !: ElementRef;
  @ViewChild('kr2') kr2 !: ElementRef;
  @ViewChild('lockR') lockR !: ElementRef;
  @ViewChild('confirmD') confirmD !: ElementRef;
  @ViewChild('kd1') kd1 !: ElementRef;
  @ViewChild('kd2') kd2 !: ElementRef;
  @ViewChild('lockD') lockD !: ElementRef;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _arrivals: ArrivalsService,
    private _exchange: ExchangeService
  ) {
    this.oldLine = new Line(void 0, void 0, void 0);
    this.newLine = new Line(void 0, void 0, void 0);
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => this.getLine(params.get('line')));
  }

  /*------------------------------------------------------------------*/
  // Query Functions
  /*------------------------------------------------------------------*/

  private getLine = (identifier: string) => this._arrivals.getLineTotalKey(identifier)
    .subscribe(async (res: Dline) => {
      this.oldLine = new Line(res.data.identifier, res.data.name, res.data.countKeys)
      this.newLine = new Line(res.data.identifier, res.data.name, void 0)
    }, () => this._router.navigate(['home']));

  /*------------------------------------------------------------------*/
  // Event Functions
  /*------------------------------------------------------------------*/

  public resetClenchs(): void {
    this.confirmF.nativeElement.classList.add('d-none');
    this.kf1.nativeElement.checked = false;
    this.kf2.nativeElement.checked = false;
    this.lockF.nativeElement.disabled = true;
    this.confirmR.nativeElement.classList.add('d-none');
    this.kr1.nativeElement.checked = false;
    this.kr2.nativeElement.checked = false;
    this.lockR.nativeElement.disabled = true;
    this.confirmD.nativeElement.classList.add('d-none');
    this.kd1.nativeElement.checked = false;
    this.kd2.nativeElement.checked = false;
    this.lockD.nativeElement.disabled = true;
  }

  public onSubmit(): void {
    document.body.classList.add('wait');
    this._exchange.updateLine(this.oldLine.identifier, this.newLine).subscribe(async (res: Dline) => {
      await document.body.classList.remove('wait');
      await this.resetClenchs();
      this.getLine(res.data.identifier);
      alertify.success(`${res.data.identifier}<br/>[Actualizo con éxito]`);
    }, err => {
      document.body.classList.remove('wait');
      alertify.error(err.error.message);
    });
  }

  public confirmDisplay(confirm): void {
    confirm.classList.remove('d-none');
  }

  public clench(key1, key2, lock): void {
    if (key1.checked && key2.checked) lock.disabled = false;
    else lock.disabled = true;
  }

  public confirmForzar = () => this._exchange.forceUpdateLine(this.oldLine.identifier, this.newLine)
    .subscribe(async () => await this._router.navigate(['line']), err => alertify.error(err.error.message));

  public confirmResetImages(): void {
    document.body.classList.add('wait');
    this._exchange.resetLineImage(this.oldLine.identifier, this.status).subscribe(async (res: Dline) => {
      await document.body.classList.remove('wait');
      await this.resetClenchs();
      this.getLine(this.oldLine.identifier);
      alertify.success(`Imágenes en ${this.oldLine.identifier}<br/>[${this.oldLine.countKeys} Reseteadas]`);
    }, err => {
      document.body.classList.remove('wait');
      alertify.error(err.error.message);
    });
  }

  public confirmDelete = () => this._exchange.forceDeleteLine(this.oldLine.identifier)
    .subscribe(async () => await this._router.navigate(['line']), err => alertify.error(err.error.message));
}
