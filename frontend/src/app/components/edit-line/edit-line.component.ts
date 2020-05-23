import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-edit-line',
  templateUrl: './edit-line.component.html',
  styleUrls: ['./edit-line.component.scss']
})
export class EditLineComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _arrivals: ArrivalsService,
    private _exchange: ExchangeService
  ) { }

  ngOnInit(): void {
  }

}
