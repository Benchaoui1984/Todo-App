import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-pop-pup',
  templateUrl: './pop-pup.component.html',
  styleUrl: './pop-pup.component.css',
})
export class PopPupComponent {
  error: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopPupComponent>
  ) {
    this.error = data.message;
  }
}
