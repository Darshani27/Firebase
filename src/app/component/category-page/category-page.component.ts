import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  products:any[]=[];
  displayedColumns: string[] = ['category','action'];
  items: any;

  constructor(private dataService:DataService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.retrieveProducts();
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
      this.items=this.products.map((r:any)=>{
        return r.category;
      });
      this.items=[...new Set(this.items)];
     },(err)=>{
      alert(err.message);
     });
    
  }

  deleteCategory(ele:any)
  {
    console.log(ele);
    
  }

  addCategory()
  {
    const dialogRef=this.dialog.open(AddCategoryComponent);
    dialogRef.afterClosed().subscribe((res:any)=>{
      this.dataService.setcategoryData(res);
    });
  }

}
