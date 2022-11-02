import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  title:string="Add Category";
  categoryForm:FormGroup={} as any;
  data:any;
  constructor(private _snackBar:MatSnackBar,private router:Router, @Optional() public dialogRef: MatDialogRef<AddCategoryComponent>) { }


  ngOnInit(): void {
    this.categoryForm=new FormGroup({
      'category':new FormControl('',Validators.required)
    });
     this.categoryForm.valueChanges.subscribe((res:any)=>{
      this.data=res;
    }); 
   
  }
  getErrorMessage()
  {
    if(this.categoryForm.value.category=='')
    {
      return 'Please Enter Value';
    }
    return '';
  }

  onDismiss()
  {
    this.dialogRef.close();
    return true;
  }

  onConfirm()
  {
    // this.data=this.categoryForm.value.productcategory;
    
    // this.dialogRef.close(this.data);  
    this.router.navigate(['/dashboard']);
    this.onDismiss();
  }

}
