import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent implements OnInit {

  // manageAddressForm:FormGroup={} as any;
  constructor(private fb: FormBuilder) { }

  manageAddressForm=this.fb.group({
    area:['',Validators.required],
    landmark:['',Validators.required],
    city:['',Validators.required],
    pincode:['',Validators.required],
    address:this.fb.array([])
  });
  ngOnInit(): void {
   
  }
  get address() {
    return this.manageAddressForm.controls["address"] as FormArray;
  }
  addAddress()
  {
    // const addresses=this.manageAddressForm.controls['address'] as FormArray;
    // addresses.push(this.fb.group(
    //   {
    //     area: ['', Validators.required],
    //     landmark: ['', Validators.required]
        
    //   }
    // ));
    const addresses = this.fb.group({
      area: ['', Validators.required],
      landmark: ['', Validators.required],
      city:['',Validators.required],
      pincode:['',Validators.required]
    });
    this.address.push(addresses);
  }
}
