import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Key } from 'src/app/models/key';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-add-key',
  templateUrl: './add-key.component.html',
  styleUrls: ['./add-key.component.scss']
})
export class AddKeyComponent implements OnInit {
  public Keys: Key;
  public LineArray: Array<String>;
  @ViewChild('line') line: ElementRef;
  @ViewChild('code') code: ElementRef;

  constructor(
    private _type: NgbTypeaheadConfig,
    private _arrivals: ArrivalsService,
    private _f: FunctionsService
  ) {
    _type.showHint = true;
  }

  public ngOnInit(): void {
    this.getLines();
  }

  public ngAfterViewInit(): void {
    this._f.denyAlphanumeric(this.line);
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

  public search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 1 ? [] : this.LineArray.filter(v => v.toLowerCase().startsWith(term.toLocaleLowerCase())).splice(0, 10))
  );

  private getLines = () => this._arrivals.getLines().subscribe(res => {
    if (res.data) {
      let cont = new Array();
      res.data.forEach(e => cont.push(e._id));
      this.LineArray = cont;
    }
  }, err => console.log(<any>err));
}
