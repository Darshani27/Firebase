import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {
   sellerForm:FormGroup={} as any;
  itemsofCategory: any;
  categories: any;
  currentUser: any;
  product: any;
  submitted: boolean=false;
  products: any;
  names: any;


  constructor(@Optional() public dialogRef: MatDialogRef<SellerDashboardComponent>,private router:Router,private dataService:DataService,private auth:AuthService,private _snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.sellerForm=new FormGroup({
      'name':new FormControl('',Validators.required),
      'price':new FormControl('',[Validators.required,Validators.pattern('[0-9]*')]),
      'category':new FormControl('',Validators.required)
    });
    this.auth.getCurrentUser().subscribe((res:any)=>{
      this.currentUser=res;
    });
    this.retrieveCategories();
    this.retrieveProducts();
  }
  retrieveProducts(): any {
    this.dataService.getAll().snapshotChanges().pipe(
      map((changes: any[]) => {
        return changes.map(c => {
          return { key: c.key, ...c.payload.val() };
        })
      })
    ).subscribe((data: any) => {
      this.products = data;
    }, (err) => {
      alert(err.message);
    });

  }
  changeCategory(event:any)
  {
    console.log(event.target.value);
    this.sellerForm.controls['category'].setValue(event.target.value);
    
  }
  retrieveCategories() {
    this.dataService.getCategories().snapshotChanges().pipe(
      map((changes: any[])=>{
        return changes.map(c=>{
          return {key:c.key,...c.payload.val()};
        })   
      })
     ).subscribe((data : any)=>{
      this.itemsofCategory=data;
      this.itemsofCategory=this.itemsofCategory.filter((r:any)=>{
         return r.isActive==true 
      }
      )
      this.categories=[...this.itemsofCategory];
      this.categories=this.categories.map((x:any)=>{ return x.category});
     },(err)=>{
      alert(err.message);
     }); 
   
  }
  getErrorMessage()
  {
    if(this.sellerForm.value.price==''||this.sellerForm.value.category=='' || this.sellerForm.value.name=='')
    {
      return 'Please enter value';
    }
    if(this.sellerForm.value.price != ""&& this.sellerForm.controls['price'].hasError('pattern'))
    {
      return 'Invalid Price';
    }
    return'';
  }
  saveProduct()
  {
    this.product={
    name:this.sellerForm.value.name,
    price:this.sellerForm.value.price,
    category:this.sellerForm.value.category,
    units:1,
    isActive:true,
    addedBy:this.currentUser
   } as any;
   if((this.sellerForm.value.price==''||this.sellerForm.value.category=='' || this.sellerForm.value.name==''))
   {
    this._snackbar.open('Please Enter Product Details','OK');
    this.submitted=false;
    this.router.navigate(['/seller-dashboard']);
   }
   if((this.sellerForm.value.price!=''||this.sellerForm.value.category!='' || this.sellerForm.value.name!=''))
   {
    this.names=this.products.map((r:any)=>{return r.name});
    if(!(this.names.includes(this.sellerForm.value.name)))
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
        if (r.name == this.sellerForm.value.name) {
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


}
