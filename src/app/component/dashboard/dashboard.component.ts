import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  product:Product={} as any;
  submitted:boolean=false;
  productForm:FormGroup={} as any;
  result:boolean=false;
  message: string="Are you sure you want to logout ?";
  title: string="Confirm Action";
  products: any[]=[];
  productNames: any[]=[];


  constructor( @Optional()public dialogRef: MatDialogRef<DashboardComponent>,private dataService:DataService,private auth:AuthService,private dialog:MatDialog,private router:Router,private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.productForm=new FormGroup({
      'productname': new FormControl('',Validators.required),
      'productprice': new FormControl('',[Validators.required,Validators.pattern('[0-9]*')]),
      'productcategory':new FormControl('',Validators.required)
    });
    this.dataService.getcategoryData().subscribe((res:any)=>{
      console.log(res);
      if(res!=undefined)
      {
       this.productForm.controls['productcategory'].setValue(res?.category);
      }
    });
    this.retrieveProducts();
  }

  retrieveProducts() : any {
    this.dataService.getAll().snapshotChanges().pipe(
     map((changes: any[])=>{
       return changes.map(c=>{
         return {key:c.key,...c.payload.val()};
       })   
     })
    ).subscribe((data : any)=>{
     this.products=data;
     return this.products;
    },(err)=>{
     alert(err.message);
    });
    
   }
  saveProduct()
  {
    this.product={
    name:this.productForm.value.productname,
    price:this.productForm.value.productprice,
    category:this.productForm.value.productcategory,
    units:1
   } as any;
   if((this.productForm.value.productprice==''||this.productForm.value.productcategory=='' || this.productForm.value.productname=='')&& !this.result)
   {
    this._snackbar.open('Please Enter Product Details','OK');
    this.submitted=false;
    this.router.navigate(['/dashboard']);
   }
   if((this.productForm.value.productprice!=''||this.productForm.value.productcategory!='' || this.productForm.value.productname!='') || this.result)
   {
    this.productNames=this.products.map((r:any)=>{return r.name});
    if(!(this.productNames.includes(this.productForm.value.productname)))
    {
      this.dataService.createProduct(this.product).then((res: any)=>{
        this.submitted=true;
        this._snackbar.open('Product Added Successfully','OK');
        this.dialogRef?.close(true);
      });
    }
    else
    {
      this.products=this.products.map((r:any)=>{
        if (r.name == this.productForm.value.productname) {
          r.units++;
          var temp = r;
          const key = temp?.key;
          const data = { units: r.units };
          this.dataService.update(key, data).then((res: any) => {
            this._snackbar.open('Products units has been inceased', 'OK');
          });
        }else
        {
          return;
        }
      });
    }
   }
  }

  newProduct()
  {
     this.product={} as any;
     this.submitted=false;
  }

  submittedMessage()
  {
    return 'You have submitted successfully !'
  }
  getErrorMessage()
  {
    if(this.productForm.value.productprice==''||this.productForm.value.productcategory=='' || this.productForm.value.productname=='')
    {
      return 'Please enter value';
    }
    if(this.productForm.value.productprice != ""&& this.productForm.controls['productprice'].hasError('pattern'))
    {
      return 'Invalid Price';
    }
    return'';
  }
  signOut()
  {
    const dialogRef=this.dialog.open(ConfirmDialogComponent,
      {
        maxWidth: "400px",
        data:{title:this.title,message:this.message}
      });
      dialogRef.afterClosed().subscribe((res : any)=>{
        this.result=res;
        console.log(this.result);
        if (this.result) {
          this.auth.logout();
        }
      });
    
  }
 
}
