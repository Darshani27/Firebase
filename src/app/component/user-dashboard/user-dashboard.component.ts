import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(private dataService:DataService,private dialog:MatDialog,private auth:AuthService,private _snackbar:MatSnackBar,private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.retrieveProducts();
    this.auth.preventBackButton();
  }
  retrieveProducts() {
    this.dataService.getAll().valueChanges().subscribe((res)=>{
      this.products=res;
      this.items=res.map(r=>({...r,quantity:1}));
    });
  }
  addToCart(item:any)
  {
    this.cartService.addToCart(item);
    this._snackbar.open('Product Added To Cart','OK');
    this.cartQty=this.cartService.getItems();
    this.itemInCart=this.cartQty.length;
    
  }
  // https://javascript.plainenglish.io/develop-an-online-shop-with-angular-11-and-net-core-5-f0ed1ac0aeeb
}
