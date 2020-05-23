import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { Line, Dline } from 'src/app/models/line';

@Component({
  selector: 'app-edit-line',
  templateUrl: './edit-line.component.html',
  styleUrls: ['./edit-line.component.scss']
})
export class EditLineComponent implements OnInit {
  public oldLine: Line;
  public newLine: Line;
  public status: number;

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

  private getLine = (identifier: string) => this._arrivals.getLine(identifier)
    .subscribe(async (res: Dline) => {
      this.oldLine = new Line(res.data.identifier, res.data.name, void 0)
      this.newLine = new Line(res.data.identifier, res.data.name, void 0)
    }, () => this._router.navigate(['home']));

  /*------------------------------------------------------------------*/
  // Event Functions
  /*------------------------------------------------------------------*/

}
