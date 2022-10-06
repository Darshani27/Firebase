import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  items:any[]=[];
  quantity:number=0;
  constructor() { }
  addToCart(product: any) {
    let found=false;
    this.items=this.items.map((r)=>{
      if(r.name==product.name)
      {
        r.quantity++;
        found=true;
      }
      return r;
    });
    if(!found)
    {
    this.items.push(product);
    }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
  removeItem(item:any):any
  {
    const element=this.items.indexOf(item);
    let removeFromCart=false;
    if(element >-1)
    {
      this.items = this.items.map((r) => {
        if(item)
        {
          r.quantity = r.quantity - 1;
          if(r.quantity==0)
          {
            removeFromCart=true;
          }
        }
        return r;
      });
      if(removeFromCart)
      {
         this.items.splice(element, 1);
      }
    }
    this.items=[...this.items];
  }
}
