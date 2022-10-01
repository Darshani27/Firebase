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
      'updatedproductname':new FormControl(this.incomingData.name),
      'updatedproductprice':new FormControl(this.incomingData.price),
      'updatedproductcategory':new FormControl(this.incomingData.category)
  })
  console.log(this.incomingData);
  // console.log(this.updateForm.value);
  this.updateForm.valueChanges.subscribe((res : any)=>{
    // console.log(res);
    this.data={...res,key:this.incomingData.key,result:this.result};
  });
  }
  onNoClick()
  {
    this.dialogRef.close();
  }
}
