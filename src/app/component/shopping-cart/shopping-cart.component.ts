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
  displayedColumns: string[] = ['name', 'price', 'category'];

  constructor(private cartService:CartServiceService,private router:Router) { }

  ngOnInit(): void {
    this.items=this.cartService.getItems();
  }
  clearCart()
  {
    this.cartService.clearCart();
    this.router.navigate(['/user-dashboard']);
  }
}
