import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SellerPageComponent implements OnInit {

  displayedColumns: string[] = [ 'category','action'];
  columnsToDisplay:string[]=['name','category','action']

  items: any;
  categories: any;
  result: any;
  btnDisable: boolean=false;
  currentUser: any;
  products: any;
  myList: any[]=[];
  productOfCategory: any;

  constructor(private dataService:DataService,private dialog:MatDialog,private _snackBar:MatSnackBar,private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe((res:any)=>{
      this.currentUser=res;
    })
    this.retrieveCategories();
    this.retrieveProducts();
  }
  retrieveProducts() {
    this.dataService.getAll().snapshotChanges().pipe(
      map((changes: any[]) => {
        return changes.map(c => {
          return { key: c.key, ...c.payload.val() };
        })
      })
    ).subscribe((data: any) => {
      this.products = data;
      this.productOfCategory=this.products.filter((r:any)=>{
        return r.addedBy==this.currentUser;
      })
    }, (err) => {
      alert(err.message);
    });
  }
  retrieveCategories() {
    this.dataService.getCategories().snapshotChanges().pipe(
      map((changes: any[])=>{
        return changes.map(c=>{
          return {key:c.key,...c.payload.val()};
        })   
      })
     ).subscribe((data : any)=>{
      this.items=data;
      this.items=this.items.filter((r:any)=>{
         return (r.addedBy==this.currentUser && r.isActive==true)
      }
      )
      this.categories=[...this.items];
     },(err)=>{
      alert(err.message);
     }); 
  }
  enableDisableProduct(item:any,event:MatSlideToggleChange)
  {
    if(item.isActive==true)
    {
      const dialogRef=this.dialog.open(ConfirmDialogComponent,
        {
          maxWidth:'400px',
          data:{title:'Confirm Action',message:'Are You Sure You Want To Disable ?'}
        });
      dialogRef.afterClosed().subscribe((res:any)=>{
        this.result=res;
        if(this.result)
        {
              item.isActive=false;
              const data={...item,isActive:false};
              this.dataService.update(item.key,data).then((res)=>{
              this._snackBar.open(' Product Disabled Successfully','OK');
              this.retrieveProducts();
              }); 
              this.btnDisable=false;
        }
        else{
          item.isActive=true;
          event.source.checked=true;
          this.btnDisable=true;
        }
      });
    }
    else if(item.isActive==false)
    {
      const dialogRef=this.dialog.open(ConfirmDialogComponent,
        {
          maxWidth: "400px",
          data:{title:'Confirm Action',message:'Are You Sure You Want to Enable ?'}
        });
        dialogRef.afterClosed().subscribe((res :any)=>
        {
          this.result=res;
          if(this.result)
          {
                item.isActive=true;
                const data={...item,isActive:true};
                this.dataService.update(item.key,data).then((res)=>{
                this._snackBar.open('Product Enabled Successfully','OK');
                event.source.checked=true;
                this.retrieveProducts();
                });
          }
          else
          {
            item.isActive=false;
            event.source.checked=false;
          }
        });
    }
    
  }

}
