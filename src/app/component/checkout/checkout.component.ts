import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import {} from 'googlemaps';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit ,  AfterViewInit{
  @ViewChild('map',{ static: true }) mapElement: any;
  map: google.maps.Map={} as any;

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
    const mapProperties = {
      center: new google.maps.LatLng(22.7196,  75.8577),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    google.maps.event.addDomListener(window, 'load', this.initialize);
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }
  initialize()
  {
    var input = document.getElementById('location') as any;
    var autocomplete = new google.maps.places.Autocomplete(input);
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