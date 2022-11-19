import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css']
})
export class SellerPageComponent implements OnInit {

  displayedColumns: string[] = [ 'category','action'];
  items: any;
  categories: any;
  result: any;
  btnDisable: boolean=false;

  constructor(private dataService:DataService,private dialog:MatDialog,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveCategories();
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
      this.categories=[...this.items];
     },(err)=>{
      alert(err.message);
     }); 
  }
  enableDisable(item:any,event:MatSlideToggleChange)
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
              this.dataService.updateCategory(item.key,data).then((res)=>{
              this._snackBar.open('Category Disabled Successfully','OK');
              this.retrieveCategories();
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
  }

}
