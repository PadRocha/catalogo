import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {
  public element: Array<any>;

  constructor() { }

  public childrenForEach(children: any, callback: Function): void {
    children.changes.subscribe(el => {
      el.toArray().forEach((e, index: Number, array: Array<any>) => {
        callback(e.nativeElement, index, array);
      });
    });
  }

  public findChidlren(element: any, target: any, search: any): any {
    return element.find(e => e.nativeElement[target] === search).nativeElement;
  }

  public event(element: any, event: String, callback: Function): void {
    if (element.nativeElement) element.nativeElement.attachEvent
      ? element.nativeElement.attachEvent('on' + event, callback)
      : element.nativeElement.addEventListener(event, callback, !!0);
    else element.attachEvent
      ? element.attachEvent('on' + event, callback)
      : element.addEventListener(event, callback, !!0);
  }

  public eventQuery(element: any, query: String, event: String, callback: Function): void {
    const e = element.querySelector(query);
    e.attachEvent
      ? e.attachEvent('on' + event, callback)
      : e.addEventListener(event, callback, !!0);
  }

  public eachQuery(element: any, query: String, callback: Function): void {
    element.querySelectorAll(query).forEach(callback);
  }

  public clearElement(element: any): void {
    Array.from(element.childNodes).map(child => {
      element.removeChild(child);
    });
  }

  public denyAlphanumeric(element: any, keypress: Function = () => { }): void {
    const event = 'keypress';
    const callbackEvent = e => {
      const theEvent = e || window.event;
      const key = String.fromCharCode(theEvent.keyCode || theEvent.which);
      const regex = /^[A-Za-z0-9\s]+$/;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }
      keypress(e, theEvent, key);
    }
    if (element.nativeElement) element.nativeElement.attachEvent
      ? element.nativeElement.attachEvent('on' + event, callbackEvent)
      : element.nativeElement.addEventListener(event, callbackEvent, !!0);
    else element.attachEvent
      ? element.attachEvent('on' + event, callbackEvent)
      : element.addEventListener(event, callbackEvent, !!0);
  }
}
