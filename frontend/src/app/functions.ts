import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Functions {

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

  private keypress(event: any, regex: RegExp, keypress: Function = () => Boolean): void {
    const theEvent = event || window.event;
    const key = String.fromCharCode(theEvent.keyCode || theEvent.which);
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault)
        theEvent.preventDefault();
      keypress(theEvent, key, theEvent.target.value);
    }
  }

  public onlyAlphanumeric(element: any, keypress: Function = () => Boolean): void {
    this.event(element, 'keypress', e => this.keypress(e, /^[A-Za-z0-9\s]+$/, keypress));
  }

  public onlyNumeric(element: any, keypress: Function = () => Boolean): void {
    this.event(element, 'keypress', e => this.keypress(e, /^[0-9]+$/, keypress));
  }

  public createImageFromBlob(image: Blob): Promise<string | ArrayBuffer> {
    const reader = new FileReader();
    if (image) reader.readAsDataURL(image);
    return new Promise<string | ArrayBuffer>(resolve => {
      reader.addEventListener("load", () => resolve(reader.result), false);
    })
  }

  public dataURItoBlob(dataURI): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    return new Blob([ab], { type: mimeString });
  }
}
