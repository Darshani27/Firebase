import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm:FormGroup={} as any;
  constructor() { }

  ngOnInit(): void {
    this.checkoutForm=new FormGroup({
      'email':new FormControl('',[Validators.required,Validators.email]),
      'fullName':new FormControl('',Validators.required),
      'address':new FormControl('',Validators.required),
      'city':new FormControl('',Validators.required),
      'postalPin':new FormControl('',[Validators.required,Validators.pattern('[0-9]*')]),
    })
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
}
