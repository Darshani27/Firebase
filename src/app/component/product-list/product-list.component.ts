import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { DataService } from 'src/app/shared/data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UpdateDetailComponent } from '../update-detail/update-detail.component';

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
  displayedColumns: string[] = ['name', 'price', 'category','units','action'];
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
  data:Product={};

  
  constructor(private dataService:DataService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts() : any {
   this.dataService.getAll().snapshotChanges().pipe(
    map(changes=>{
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

    const dialogRef=this.dialog.open(UpdateDetailComponent,
      {
        maxWidth:"900px",
        data:this.newProduct,
      }
      );
      
      dialogRef.afterClosed().subscribe((res)=>{
        this.data=res || []; 
        if(this.data != this.newProduct)
        {
          this.dataService.update(res.key,this.data).then(
            ()=>{
              this._snackBar.open('Record updated Successfully','OK');
              this.products=this.retrieveProducts();
          }).catch((err)=>{
            console.log(err);
          }); 
        }    
      });
  }
  deleteProduct(ele : any)
  {
    this.newProduct={...ele};
    const dialogRef=this.dialog.open(ConfirmDialogComponent,
      {
        maxWidth: "400px",
        data:{title:this.title,message:this.message}
      });
      dialogRef.afterClosed().subscribe((res)=>{
        this.result=res;
        if(this.newProduct.key)
        {
          if(this.result)
          {
            if(ele.units>1)
            {
               ele.units--;
               this.dataService.update(this.newProduct.key,{units:ele.units}).then((res:any)=>{
                this._snackBar.open('Units updated successfully',this.action);
                this.retrieveProducts();
               });
               if(ele.units==0)
               {
                this.dataService.delete(this.newProduct.key).then(
                  (res)=>{
                    this._snackBar.open(this.deleteMsg,this.action);
                    this.retrieveProducts();
                  }
                ).catch((err)=>{
                  console.log(err);
                });
               }
              
            }
            
          }
        }
      })
   
  }
  addProduct()
  {
    const dialogRef=this.dialog.open(DashboardComponent,
      );
    dialogRef.afterClosed().subscribe((res:any)=>{
      console.log(res);   
    })
  }
}
