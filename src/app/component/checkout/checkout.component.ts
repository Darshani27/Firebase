import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit ,  AfterViewInit{

  public handleAddressChange(address: Address) {
    console.log(address);
}
  checkoutForm:FormGroup={} as any;
  constructor(private dialog:MatDialog) { }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.checkoutForm=new FormGroup({
      'email':new FormControl('',[Validators.required,Validators.email]),
      'fullName':new FormControl('',Validators.required),
      'address':new FormControl('',Validators.required),
      'city':new FormControl('',Validators.required),
      'postalPin':new FormControl('',[Validators.required,Validators.pattern('[0-9]*')]),
    });
    }
  getErrorMessage()
  {
    if(this.checkoutForm.value.email==''||this.checkoutForm.value.fullName==''||this.checkoutForm.value.address==''||this.checkoutForm.value.city==''||this.checkoutForm.value.postalPin=='')
    {
      return 'Please enter Value'
    }
    if(this.checkoutForm.controls['email'].hasError('email'))
    {
      return 'Not a Valid Email';
    }
    if(this.checkoutForm.controls['postalPin'].hasError('pattern'))
    {
      return 'Not a Valid Pin';
    }
    return '';
  }
 
  OnCheckout()
  {
    if(!this.checkoutForm.untouched)
    {
      const dialogRef=this.dialog.open(PaymentComponent,
        {
          width:"600px",
          maxHeight:"700px",
          data:this.checkoutForm.value.address
        }
      );
      dialogRef.afterClosed().subscribe((res)=>{
        console.log(res);  
      });
    }
  }
}
// https://angular-material-extensions.github.io/google-maps-autocomplete/doc/index.html
// https://medium.com/@dhormale/use-google-places-api-autocomplete-using-angular-for-resident-and-office-address-23cc33078e8