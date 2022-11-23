import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/shared/auth.service';
import { CartServiceService } from 'src/app/shared/cart-service.service';
import { DataService } from 'src/app/shared/data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  products:Product[]=[];
  result:boolean=false;
  message: string="Are you sure you want to logout ?";
  title: string="Confirm Action";
  items:any[]=[];
  cartQty:any;
  itemInCart: any;
  ref: AngularFireStorageReference={} as any;
  task: AngularFireUploadTask={} as any;
  uploadProgress: Observable<number>|undefined;
  downloadURL!: Observable<String>;
  fashionDownloadURL!: Observable<String>;
  categories: any[]=[];
  currentUser: any;
  itemsofCategory: any;


  constructor(private route:Router,private afStorage:AngularFireStorage,private dataService:DataService,private dialog:MatDialog,private auth:AuthService,private _snackbar:MatSnackBar,private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.retrieveCategories();
    this.retrieveProducts();
    this.auth.preventBackButton();
    this.getProductImage();
  }
  retrieveCategories() {
    this.dataService.getCategories().snapshotChanges().pipe(
      map((changes: any[])=>{
        return changes.map(c=>{
          return {key:c.key,...c.payload.val()};
        })   
      })
     ).subscribe((data : any)=>{
      this.itemsofCategory=data;
      this.itemsofCategory=this.itemsofCategory.filter((r:any)=>{
         return r.isActive==true
      }
      )
      this.categories=[...this.itemsofCategory];
      this.categories=this.categories.map((x:any)=>{ return x.category});
     },(err)=>{
      alert(err.message);
     }); 
  }
  getProductImage() {
   this.afStorage.ref('/products/electronics.jpg').getDownloadURL().subscribe((res:any)=>{
    this.downloadURL=res;
   });
   this.afStorage.ref('/products/fashion.jpg').getDownloadURL().subscribe((res:any)=>{
    this.fashionDownloadURL=res;
   })
  }
  retrieveProducts() {
    this.dataService.getAll().valueChanges().subscribe((res)=>{
      const responseCategories=res.map((r:any)=>{
        return r.category;
      });
      const category=[... new Set(responseCategories)];
      const deActiveCategory=category.find((r)=>{if(this.categories.indexOf(r)==-1) return r;}) 
       this.products=res;
       this.items=res.map(r=>({...r,quantity:1}));
       this.items=this.items.filter((r:any)=>{
         return r.isActive==true
       });
       this.dataService.setprodData(this.items);

    });
    this.dataService.getprodData().subscribe((res:any)=>{
      this.items=res;
    })
  }
  addToCart(item:any)
  {
    this.cartService.addToCart(item);
    this._snackbar.open('Product Added To Cart','OK');
    this.cartQty=this.cartService.getItems();
    this.itemInCart=this.cartQty.length;   
  }
  reDirect(item:any)
  {
    this.auth.setsearchOption(item.name);
    this.route.navigate(['/product-detail']);
  }
  // https://javascript.plainenglish.io/develop-an-online-shop-with-angular-11-and-net-core-5-f0ed1ac0aeeb
}





