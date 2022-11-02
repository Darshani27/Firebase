import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  products:any[]=[];
  displayedColumns: string[] = ['category','action'];

  constructor(private dataService:DataService) { }

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
      return this.products;
     },(err)=>{
      alert(err.message);
     });
    
  }

}
