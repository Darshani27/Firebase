import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DataService } from 'src/app/shared/data.service';
import { ThisReceiver } from '@angular/compiler';

export class Product{
  name : string='';
  key?:string| undefined;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // product=new Product();
  products:Product[]=[];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  productCtrl = new FormControl('');
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }
  add(value:any)
  {
    // const value=(event.value || '').trim();
    // const val=this.products.length;
    if(value)
    {
      this.products.push({name:value});
    }
    // event.chipInput.clear();
    value='';
    console.log(this.products);
    this.dataService.createProductsList(this.products);
  }
  remove(product :any)
  {
    const index=this.products.indexOf(product);
    if(index >=0)
    {
      this.products.splice(index,1);
    }
    // console.log(product);
    // console.log(JSON.stringify(product));
    
    this.dataService.removeProduct(product.name);
    console.log(product.name);
    
    // this.dataService.removeProduct(this.product.key)
  }
}
