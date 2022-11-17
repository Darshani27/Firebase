import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { BehaviorSubject, from, Observable, switchMap } from 'rxjs';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dbPath = '/products';
  private userPath='/users';
  private ordersPath='/orders';
  private categoriesPath='/categories';
  private settingsOfOrder='/settings';
  productRef: AngularFireList<Product>={} as any;
  ref:AngularFireList<User>={} as any;
  categoryRef:AngularFireList<any>={} as any;
  orderRef:AngularFireList<any>={} as any;
  settingRef:AngularFireList<any>={} as any;
  users: any[]=[];
  prodData:any=new BehaviorSubject([]);
  categoryData:any= new BehaviorSubject('');

  constructor(private db :AngularFireDatabase,private fieauth:AngularFireAuth) {
    this.productRef=db.list(this.dbPath); 
    this.ref=db.list(this.userPath);   
    this.orderRef=db.list(this.ordersPath);
    this.categoryRef=db.list(this.categoriesPath);
    this.settingRef=db.list(this.settingsOfOrder);
   }

  create(user: User): any {
    const ref=this.db.list('users');
    ref.push(user).then((res)=>{
      console.log(res);
      
    });
  }
  
  createSetting(setting: any) {
    return this.settingRef.push(setting);
  }

  getSetting(): AngularFireList<any> {
    return this.settingRef;
  }
   updateSetting(key: any,item:any)
   {
    return this.settingRef.update(key,item);
   }
  createCategory(category:any)
  {
    return this.categoryRef.push(category);
  }
  getCategories():AngularFireList<any>
  {
    return this.categoryRef;
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
  updateCategory(key:string,value:any)
  {
    return this.categoryRef.update(key,value);
  }
  delete(key:string)
  {
    return this.productRef.remove(key);
  } 
  deleteCategory(key:string)
  {
    return this.categoryRef.remove(key);
  }
  updateEmail(key:string,value:any)
  {
    return this.ref.update(key,value);
  } 
  updatePassword(key:string,value:any)
  {
    return this.ref.update(key,value);
  }
  updateUser(key:string,value:any)
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

setprodData(data:any)
{
  this.prodData.next(data);
}
getprodData()
{
  return this.prodData;
}
setcategoryData(data:any)
{
  this.categoryData.next(data);
}
getcategoryData()
{
  return this.categoryData;
}
}
