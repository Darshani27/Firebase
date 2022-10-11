import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartServiceService } from 'src/app/shared/cart-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  items:Product[]=[];
  displayedColumns: string[] = ['name', 'price', 'category','quantity','action'];

  constructor(private cartService:CartServiceService,private router:Router) { }

  ngOnInit(): void {
    this.retrieveItems();
  }
  retrieveItems()
  {
    this.items=this.cartService.getItems();
  }
  clearCart()
  {
    this.cartService.clearCart();
    this.router.navigate(['/user-dashboard']);
  }
  deleteProduct(item:any)
  {
    this.cartService.removeItemFromCart(item);
    this.retrieveItems();
  }
  getTotalCost() {
      return this.items.map(t => parseInt(t.price as any)*(t.quantity as any)).reduce((acc: any, value: any) => acc + value, 0);
    }
  increaseQuantity(item:any)
    {
      this.cartService.addToCart(item);      
    }
  decreaseQuantity(item:any)
    {
      this.cartService.removeItem(item);
      this.retrieveItems();
    }
}
