import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { DataService } from 'src/app/shared/data.service';

type NewType = Product[];

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[]=[];
  
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }
  retrieveProducts() {
   this.dataService.getAll().snapshotChanges().pipe(
    map(changes=>{
      return changes.map(c=>{
        console.log(c.payload.val())
        return {key:c.key,...c.payload.val()};
      })   
    })
   ).subscribe((data : any)=>{
    this.products=data;
   })
  }

  removeAllProducts()
  {
    this.dataService.deleteAll().then((res)=>{
      alert('Records Deleted Successfully');
    },
    (err)=>{
      alert(err.message);
    })
  }
  
}
