import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { CartServiceService } from 'src/app/shared/cart-service.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  products: any[]=[];
  downloadURL!: Observable<String>;
  fashionDownloadURL!: Observable<String>;
  searchOption: any;
  category: any;
  searchObject: any;
  productName: any;
  productPrice: any;
  currentUser: any;
  cartQty: any;
  itemInCart: any;
  items: any;

  constructor(private _snackBar:MatSnackBar,private cartService:CartServiceService,private dataService:DataService,private afStorage:AngularFireStorage,private auth:AuthService) { }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe((res:any)=>{
      this.currentUser=res;
    });
    this.dataService.getprodData().subscribe((res:any)=>{
      this.products=res;
      this.items=res.map((r: any)=>({...r,quantity:1}));
    })
    this.getProductImage();
    this.auth.getsearchOption().subscribe((res:any)=>{
      this.searchOption=res;
    });
    this.searchObject=this.items.find((r :any)=>{
      return r.name==this.searchOption;
    });
    this.category=this.searchObject?.category;
    this.productName=this.searchObject?.name;
    this.productPrice=this.searchObject?.price;
    console.log(this.searchObject);
    
  }
  getProductImage() {
    this.afStorage.ref('/products/electronics.jpg').getDownloadURL().subscribe((res:any)=>{
     this.downloadURL=res;
    });
    this.afStorage.ref('/products/fashion.jpg').getDownloadURL().subscribe((res:any)=>{
     this.fashionDownloadURL=res;
    });
   }
 addToCart()
 {
  this.cartService.addToCart(this.searchObject);
  this._snackBar.open('Item Added To Cart','OK');
  this.cartQty=this.cartService.getItems();
  this.itemInCart=this.cartQty.length;   
 }
}
