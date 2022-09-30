import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { DataService } from 'src/app/shared/data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

type NewType = Product[];

export interface DialogData
{
  title:string;
  message:string;
}
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  result:string='';
  products: Product[]=[];
  displayedColumns: string[] = ['name', 'price', 'category','action'];
  newProduct:Product={
    name:'',
    price:'',
    category:''
  } as any;
  title:string="Confirm Action";
  message:string="Are you sure you want to delete this ?";
  msg:string='Records Deleted Successfully';
  deleteMsg:string='Record Deleted !'
  action:string='OK';

  
  constructor(private dataService:DataService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts() {
   this.dataService.getAll().snapshotChanges().pipe(
    map(changes=>{
      return changes.map(c=>{
        return {key:c.key,...c.payload.val()};
      })   
    })
   ).subscribe((data : any)=>{
    this.products=data;
   },(err)=>{
    alert(err.message);
   });
  }

  removeAllProducts(): void
  {
    this.dataService.deleteAll().then((res)=>{
     this._snackBar.open(this.msg,this.action);
    },
    (err)=>{
      alert(err.message);
    })
  }
  updateProduct(ele :any)
  {
    this.newProduct={...ele};
    console.log(this.newProduct);
    
    const data={
      name:this.newProduct.name,
      price:this.newProduct.price,
      category:this.newProduct.category,
    }
    
    // console.log("key",this.newProduct.key);
    // console.log("data",data);
    
    
    if(this.newProduct.key)
    {
      this.dataService.update(this.newProduct.key,data).then(
        (res)=>{
          alert('Record updated Successfully');
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
  deleteProduct(ele : any)
  {
    const dialogRef=this.dialog.open(ConfirmDialogComponent,
      {
        maxWidth: "400px",
        data:{title:this.title,message:this.message}
      });
      dialogRef.afterClosed().subscribe((res)=>{
        this.result=res;
      })
    this.newProduct={...ele};
    if(this.newProduct.key)
    {
      if(this.result)
      {
        this.dataService.delete(this.newProduct.key).then(
          (res)=>{
            this._snackBar.open(this.deleteMsg,this.action);
          }
        ).catch((err)=>{
          console.log(err);
        });
      }
    }
  }
}
