import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private _modalService: NgbModal
  ) { }

  public open(target, callbackResult, callbackDismiss, config): any {
    const modal = this._modalService.open(target, config);
    modal.result.then(result => callbackResult(result), reason => callbackDismiss(reason));
    return modal;
  }
}
