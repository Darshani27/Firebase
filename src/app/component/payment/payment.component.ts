import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartServiceService } from 'src/app/shared/cart-service.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  items:Product[]=[];
  displayedColumns: string[] = ['name', 'price', 'category','quantity'];
  paymentMethods:any[]=['Stripe','Cash on Delivery','EMI'];

  constructor(private _snackbar:MatSnackBar,public dialogRef: MatDialogRef<PaymentComponent>,private router:Router,private cartService:CartServiceService) { }

  ngOnInit(): void {
    this.items=this.cartService.getItems();
  }
  orderPlaced()
  {
    if (this.items.length == 0) {
      this._snackbar.open('Please Add Product', 'OK');
    } else {
      this._snackbar.open('Order Placed SuucessFully', 'OK');
    }
    this.dialogRef.close(true);
    this.router.navigate(['/user-dashboard']);
  }
  getTotalCost() {
    return this.items.map(t => parseInt(t.price as any)*(t.quantity as any)).reduce((acc: any, value: any) => acc + value, 0);
  }
  stripeCheckout(event:MatRadioChange)
  {
    // console.log(event);
    if(event.value=='Stripe')
    {
      
    }
    
  }
}
