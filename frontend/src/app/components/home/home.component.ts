import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ArrivalsService } from 'src/app/services/arrivals.service';
import { ShippingService } from 'src/app/services/shipping.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { Key } from 'src/app/models/key';
import { Image } from 'src/app/models/image';

declare const $: any;
declare const alertify: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('tbody') tbody: ElementRef;
  public Keys: Array<Key>;
  public Image: Image;

  public lastDone: Boolean = false;

  constructor(
    private _auth: AuthService,
    private _arrivals: ArrivalsService,
    // private _shippings: ShippingService,
    private _exchanges: ExchangeService
  ) {
    this.Image = new Image(undefined, undefined, undefined, undefined);
    // console.log("HomeComponent -> this.Image ", this.Image)
  }

  public ngOnInit(): void {
    this.getKeys();
  }

  public ngAfterViewInit(): void { }

  public onLoad(ultimo): void {
    if (ultimo && !this.lastDone) {
      this.lastDone = true;
      let tr = Array.from($('tr', 'tbody'));
      tr.forEach(tr => {
        let _id = tr['id'];
        let select = Array.from($('select', tr))
        select.forEach(select => {
          const that = this;
          $(select).change(function () {
            if (select['value'] === '5') {
              // console.log('hola', select['value']);

            } else if (select['value'] !== '') {
              that.Image.id = Number(select['name']);
              that.Image.status = Number(select['value']);
              that._exchanges.updateStatus(_id, that.Image).subscribe(
                res => {
                  if (select['value'] == 5) select['disabled'] = true;
                  var color = $('option:selected', this).attr('class');
                  $(select).attr('class', color).addClass('form-control');
                  alertify.success(`Status ${that.Image.status}, Image ${Number(select['name']) + 1} - key ${_id}`);
                }, err => {
                  alertify.error('Error Status [reload]');
                }
              );
            } else {
              that._exchanges.deleteStatus(_id, Number(select['name'])).subscribe(
                res => {
                  $(select).attr('class', 'white').addClass('form-control');
                  alertify.success(`Status removed, Image ${Number(select['name'])} - key ${_id}`);
                }, err => {
                  alertify.error('Error Status [reload]');
                }
              );
            }
          });
        })
      });
    }
  }

  public getKeys(): void {
    this._arrivals.getKeys().subscribe(
      res => {
        if (res.data) {
          this.Keys = res.data;
        }
      }, err => {
        this._auth.verify(err);
        console.log(<any>err);
      }
    );
  }

  public statusImage(image, id): Number {
    if (!image.find(e => e.id == id)) return 6;
    return image.find(e => e.id == id).status;
  }

  public statusClass(n): String {
    switch (n) {
      case 1: return 'gray';
      case 2: return 'brown';
      case 3: return 'blue';
      case 4: return 'purple';
      case 5: return 'green';
      default: return 'white';
    }
  }
  public disabledImage(n): Boolean {
    return n === 5;
  }
}
