import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  createdSuccessful() {
    this.toastr.success(`El Todo  se ha creado con éxito`);
  }

  deletedSuccessful() {
    this.toastr.success(`El Todo  se ha borrado con éxito`);
  }
}
