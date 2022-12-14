import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  settingCounter: any;
  setting: any;
  keyOfSetting: any;
  settingUsers: any;

  constructor(private zone: NgZone,@Inject(MAT_DIALOG_DATA) public incomingData:any,private auth:AuthService,private dataService:DataService,private _snackbar:MatSnackBar,public dialogRef: MatDialogRef<PaymentComponent>,private router:Router,private cartService:CartServiceService,private authService:AuthService) { }

  ngOnInit(): void {
    this.items=this.cartService.getItems();
    this.loadStripe();
    this.getUsers();
    this.auth.getCurrentUser().subscribe((res :any)=>{
      this.currentUser=res;
    });  
    this.getSettings();  
  }
  getSettings() {
    this.dataService.getSetting().snapshotChanges().pipe(map((changes: any) => {
      return changes.map((c: any) => {
        return { key: c.key, ...c.payload.val() };
      });
    }
    )).subscribe((res: any) => {
      this.setting = res;
      if(res.length>0)
      {
        this.keyOfSetting=res.find((r:any)=>{
          return r.useId==this.currentUser;
       })?.key;
       this.settingCounter=res.find((r:any)=>{
         return r.key==this.keyOfSetting
       })?.counter;
       this.settingUsers=this.setting.map((r:any)=>{
        return r.useId;
       });
       if(this.settingUsers.includes(this.currentUser))
       {
          this.settingCounter++;
       }
       else
       {
        this.settingCounter=0;
       }
      }
      else
      {
        this.settingCounter=0;
      }
     
    },
      (err) => {
        console.log(err);
      }
    )
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
  getTotalCost() {
    return this.items.map(t => parseInt(t.price as any)*(t.quantity as any)).reduce((acc: any, value: any) => acc + value, 0);
  }
  makePayment()
  {
    this.keyOfUser=this.users.find((r :any)=>{return r.email==this.currentUser})?.key;
     var handler=(<any>window).StripeCheckout.configure({
      key:'pk_test_51LrGnISHrWttatwHd9sbrrMhEWHZ5hwZJMsmyWcIp6xlE1zST8MZqxITXwdPdShyrZNylSaDTtycmQoBajC4s47s00lu3d26xs',
      image:'',
      locale:'auto',
      token: function(token :any)
      {
        console.log(token);
      }
    });
    handler.open({
      name:'MyApp',
      description:'Pay',
      amount:this.getTotalCost() *100,
      token:()=>{
        this.zone.run(() => {
          this.router.navigate(['/user-dashboard']);
          this._snackbar?.open('Order Placed SuccessFully','OK');
          this.dialogRef.close(true);
        });
      }
    });
    const orderId='OR'+'_'+this.settingCounter;
    const currentDate=new Date();
    const dateOfOrder=currentDate.getDate() + "/" +(currentDate.getMonth() +1) + "/" +currentDate.getFullYear();
    const data={products:this.items,useId:this.keyOfUser,totalAmount:this.getTotalCost(),address:this.incomingData,date:dateOfOrder,orderId:orderId};
    this.dataService.createOrders(data).then((res:any)=>{
      if(this.settingCounter==0)
      {
        this.dataService.createSetting({orderId:orderId,counter:this.settingCounter,useId:this.currentUser});
      }
      else
      {
        this.dataService.updateSetting(this.keyOfSetting,{counter:this.settingCounter,orderId:orderId});
      }
    });
  }
}
