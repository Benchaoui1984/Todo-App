import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopPupComponent } from '../shared/modals/pop-pup/pop-pup.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorManagerService {
  constructor(private dialogRef: MatDialog, private injector: Injector) {}

  manage(response: HttpErrorResponse) {
    switch (response.status) {
      case HttpStatusCode.BadRequest:
      case HttpStatusCode.NotFound:
      case HttpStatusCode.Conflict:
        break;
      case HttpStatusCode.Unauthorized:
      case HttpStatusCode.Forbidden:
        this.dialogRef.open(PopPupComponent, {
          width: '400px',
          height: '300px',
          data: response,
        });

        break;
      default:
        this.dialogRef.open(PopPupComponent, {
          data: {
            message: `${response.statusText}`,
          },
        });
    }
  }
}
