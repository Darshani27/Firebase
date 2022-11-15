import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
export class ProductListComponent implements OnInit{
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
  sortedData: Product[]=[];
  dataSource:any;
  
  constructor(private _liveAnnouncer: LiveAnnouncer,private dataService:DataService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  @ViewChild(MatSort)
  sort!: MatSort;
  
  ngOnInit(): void {
    this.retrieveProducts();

  }

  // ngAfterViewInit() {
  //   this.dataSource.sort = this.sort;
  // }


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
        if(this.data.name != this.newProduct.name && this.data.category!=this.newProduct.category && this.data.price!=this.newProduct.price && this.data.units!=this.newProduct.units)
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
          if (this.result) {
            this.dataService.delete(this.newProduct.key).then(
              (res) => {
                this._snackBar.open(this.deleteMsg, this.action);
                this.retrieveProducts();
              }
            ).catch((err) => {
              console.log(err);
            });
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
  
  sortData(sort: Sort) {
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.products = data;
      return;
    }

    this.products= data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name?.toLowerCase(), b.name?.toLowerCase(), isAsc);
        case 'price':
          return this.compare(parseInt(a.price as any), parseInt(b.price as any), isAsc);
        case 'category':
          return this.compare(a.category, b.category, isAsc);
        case 'units':
          return this.compare(a.units, b.units, isAsc);
        default:
          return 0;
      }
      
    });
    console.log(this.products);

  }
  compare(a: any, b: any, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  
}
}
