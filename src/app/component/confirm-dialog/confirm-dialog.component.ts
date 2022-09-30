import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../product-list/product-list.component';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string='';
  message: string='';


  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { 
    this.title=data.title;
    this.message=data.message;
  }

  ngOnInit(): void {
  }
  onConfirm()
  {
    this.dialogRef.close(true);
  }
  onDismiss()
  {
    this.dialogRef.close(false);
  }

}
