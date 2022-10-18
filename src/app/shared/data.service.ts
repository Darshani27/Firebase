import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dbPath = '/products';
  private userPath='/users';
  private ordersPath='/orders';
  productRef: AngularFireList<Product>={} as any;
  ref:AngularFireList<User>={} as any;
  orderRef:AngularFireList<any>={} as any;
  users: any[]=[];


  constructor(private db :AngularFireDatabase) {
    this.productRef=db.list(this.dbPath); 
    this.ref=db.list(this.userPath);   
    this.orderRef=db.list(this.ordersPath);
   }

  create(user: User): any {
    const ref=this.db.list('users');
    ref.push(user).then((res)=>{
      console.log(res);
      
    });
  }
  
  getAll() :AngularFireList<Product>
  {    
    return this.productRef;
  }
  getAllUsers():AngularFireList<User>
  {
    return this.ref;
  }

  createProduct(product:Product) : any
  {
    return this.productRef.push(product);
  }
  createOrders(item :any):any
  {
    return this.orderRef.push(item);
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
  updateEmail(key:string,value:any)
  {
    return this.ref.update(key,value);
  } 
  getAllOrders()
  {
    return this.orderRef;
  }
  deleteUser(key:string)
  {
    return this.ref.remove(key);
  }
}
