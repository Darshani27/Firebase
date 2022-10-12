import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/shared/auth.service';
import { CartServiceService } from 'src/app/shared/cart-service.service';
import { DataService } from 'src/app/shared/data.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  items:Product[]=[];
  displayedColumns: string[] = ['name', 'category','quantity','price'];
  paymentMethods:any[]=['Stripe','Cash on Delivery','EMI'];
  confirmation:any;
  loading:boolean=false;
  handler: any;
  users: any;
  keyOfUser: any;
  currentUser: any;

  constructor(private auth:AuthService,private dataService:DataService,private _snackbar:MatSnackBar,public dialogRef: MatDialogRef<PaymentComponent>,private router:Router,private cartService:CartServiceService,private authService:AuthService) { }

  ngOnInit(): void {
    this.items=this.cartService.getItems();
    this.loadStripe();
    this.getUsers();
    this.auth.getCurrentUser().subscribe((res :any)=>{
      this.currentUser=res;
    });
  }
  getUsers() {
    this.dataService.getAllUsers().snapshotChanges().pipe(map((changes: any) => {
      return changes.map((c: any) => {
        return { key: c.key, ...c.payload.val() };
      });
    }
    )).subscribe((res: any) => {
      this.users = res;
    },
      (err) => {
        console.log(err);
      });
}
  loadStripe() {
    if(!window.document.getElementById('stripe-script'))
    {
      var s=window.document.createElement('script');
      s.id="stripe-script";
      s.type="text/javascript";
      s.src="https://checkout.stripe.com/checkout.js";
      s.onload=()=>{
        this.handler=(<any>window).StripeCheckout.configure({
          key:'pk_test_51LrGnISHrWttatwHd9sbrrMhEWHZ5hwZJMsmyWcIp6xlE1zST8MZqxITXwdPdShyrZNylSaDTtycmQoBajC4s47s00lu3d26xs',
          locale:'auto',
          token:function(token :any){
            console.log(token);
            alert('payment success');
          }
        });
      }
    }
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
  makePayment()
  {
    this.keyOfUser=this.users.find((r :any)=>{return r.email==this.currentUser})?.key;
    //  var handler=(<any>window).StripeCheckout.configure({
    //   key:'pk_test_51LrGnISHrWttatwHd9sbrrMhEWHZ5hwZJMsmyWcIp6xlE1zST8MZqxITXwdPdShyrZNylSaDTtycmQoBajC4s47s00lu3d26xs',
    //   image:'',
    //   locale:'auto',
    //   token: function(token :any)
    //   {
    //     console.log(token);
    //   }
    // });
    // handler.open({
    //   name:'hi',
    //   description:'hola',
    //   amount:this.getTotalCost() *100,
    // });
    const data={products:this.items,useId:this.keyOfUser};
    this.dataService.createOrders(data);

  }
}
