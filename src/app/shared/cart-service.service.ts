import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  items:Product[]=[];
  quantity:any;
  constructor() { }
  addToCart(product: Product) {
    this.items.push(product);
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
    this.items.splice(element,1);
    this.items=[...this.items];
  }
}
