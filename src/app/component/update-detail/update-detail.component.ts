import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-update-detail',
  templateUrl: './update-detail.component.html',
  styleUrls: ['./update-detail.component.css']
})
export class UpdateDetailComponent implements OnInit {
  updateForm:FormGroup={} as any;
  data:Product={};
  result:boolean=false;
 
 constructor(public dialogRef:MatDialogRef<UpdateDetailComponent>,@Inject(MAT_DIALOG_DATA) public incomingData:Product) { }
 

  ngOnInit(): void {
  this.result=true;
    this.updateForm=new FormGroup({
      'name':new FormControl(this.incomingData.name),
      'price':new FormControl(this.incomingData.price),
      'category':new FormControl(this.incomingData.category)
  })
  this.updateForm.valueChanges.subscribe((res : any)=>{
    this.data={...res,key:this.incomingData.key};
  });
  }
  onNoClick()
  {
    this.dialogRef.close(this.incomingData);
  }
}
