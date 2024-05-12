import { ApplicationRef, Injectable, Type } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../shared/modals/confirmation-modal/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modal!: NgbModalRef;

  constructor(private ngbModal: NgbModal, private ref: ApplicationRef) {}

  openConfirmationModal(title: string, body: string) {
    this.modal = this.ngbModal.open(ConfirmationModalComponent, { size: 'md' });

    (this.modal.componentInstance as ConfirmationModalComponent).title = title;
    (this.modal.componentInstance as ConfirmationModalComponent).body = body;

    return this.modal;
  }

  close() {
    this.modal.close();
  }
}
