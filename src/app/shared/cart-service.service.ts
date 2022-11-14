import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  items:any[]=[];
  quantity:number=0;
  itemInCart=new BehaviorSubject(0);
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
    // this.itemInCart.next(this.items.length);
    this.setItemInCart(this.items.length);
  }
setItemInCart(data:any)
{
  this.itemInCart.next(data)
}
  getItems() {
    return this.items;
  }
  removeItemFromCart(item:any)
  {
    const element=this.items.indexOf(item);
    if(element>-1)
    {
      this.items.splice(element,1);
    }
    this.items=[...this.items];
    if(this.items.length==0)
    {
      this.clearCart();
    }
  }

  clearCart() {
    this.items = [];
    this.setItemInCart(this.items.length)
    return this.items;
  }
  removeItem(item:any):any
  {
    const element=this.items.indexOf(item);
    let elementToRemove :boolean=false;
    this.items=this.items.map(
      (r)=>{
        if(r.name==item.name && item.quantity>=1)
        {
          item.quantity=item.quantity-1;
          elementToRemove=true;
        }
        return r;
      }
    )
    if(elementToRemove && item.quantity==0)
    {
    this.removeItemFromCart(item);
    }
    this.items=[...this.items];
    if(this.items.length==0)
    {
      this.clearCart();
    }
  }
  getItemInCart()
  {
    return this.itemInCart;
  }
}
