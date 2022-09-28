import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db :AngularFireDatabase) { }

  create(user: User): any {
    const ref=this.db.list('items');
    ref.push(user).then((res)=>{
      // console.log(res);
      
    });
  }
  createProductsList(product : any)
  {
    const productref=this.db.list('products');
    productref.push(product).then((res)=>{
      console.log(res);
      alert('Product Added Successfully');
      
    })
  }
  removeProduct(key : any)
  {
    const productref=this.db.list('products').remove(key);
  }
  // removeProducts()
  // {
  //   const productref=this.db.list('products');
  //   productref.remove().then((res)=>{
  //     alert('products cleared')
  //   });
  // }
}
