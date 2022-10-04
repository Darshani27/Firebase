import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dbPath = '/products';
  productRef: AngularFireList<Product>={} as any;


  constructor(private db :AngularFireDatabase) {
    this.productRef=db.list(this.dbPath);    
   }

  create(user: User): any {
    const ref=this.db.list('items');
    ref.push(user).then((res)=>{
      // console.log(res);
      
    });
  }

  getAll() :AngularFireList<Product>
  {    
    return this.productRef;
  }

  createProduct(product:Product) : any
  {
    return this.productRef.push(product);
  }

  deleteAll(): Promise<void> {
    return this.productRef.remove();
  }
  update(key:string,value:any)
  {
    return this.productRef.update(key,value);
  }
  delete(key:string)
  {
    return this.productRef.remove(key);
  }  
}
