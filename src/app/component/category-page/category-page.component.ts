import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  products:any[]=[];
  displayedColumns: string[] = ['category','action','enable'];
  items: any;
  title:string='Confirm Action';
  message:string='Are You Sure You Want to Delete ?';
  categories: any[]=[];

  constructor(private dataService:DataService,private dialog:MatDialog,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveProducts();
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
     },(err)=>{
      alert(err.message);
     });
    
  }
  retrieveProducts() {
    this.dataService.getAll().snapshotChanges().pipe(
      map((changes: any[])=>{
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

  deleteCategory(ele:any)
  {
    const dialogRef=this.dialog.open(ConfirmDialogComponent,
      {
        data:{title:this.title,message:this.message}
      });
    dialogRef.afterClosed().subscribe((res:any)=>
    {
      if(res)
      {
        const element=this.items.indexOf(ele);
        if(element>-1)
        {
          this.items.splice(element, 1);
          this.dataService.deleteCategory(ele?.key).then((res: any) => {
            this._snackBar.open('Category Deleted!', 'OK');
          });
          this.products.map((r:any)=>{
            if(r.category==ele.category)
            {
              this.dataService.delete(r?.key).then((res:any)=>{
                console.log(res);
              });
            }
          });
          this.items=[...this.items];
          
        }
      }
    });
    console.log(ele);
    
  }

  addCategory()
  {
    this.categories=this.items.map((r:any)=>{
      return r.category;
    })
    const dialogRef=this.dialog.open(AddCategoryComponent,{
      data:{add:true,
      category:''}
    });
    dialogRef.afterClosed().subscribe((res:any)=>{
      if(res!=undefined && this.categories.indexOf(res.category)==-1)
      {
        this.dataService.createCategory({category:res.category}).then((res:any)=>{
          this._snackBar.open('Category Added','OK');
          this.retrieveCategories();
          });
      }
    });
  }

  updateCategory(item:any)
  {
    console.log(item);
    const dialogRef=this.dialog.open(AddCategoryComponent,{
      data:{add:false,
      category:item.category}
    });
    dialogRef.afterClosed().subscribe((res:any)=>{
      console.log(res);
      if(res!=undefined)
      {
        this.dataService.updateCategory(item.key,{category:res.category}).then((res:any)=>{
          this._snackBar.open('Category Updated Successfully','OK');
        });
      }
      
    })
    
  }
  enableDisable(item:any,event:MatSlideToggleChange)
  {
    
  }
}
