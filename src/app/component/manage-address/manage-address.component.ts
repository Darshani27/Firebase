import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.css']
})
export class ManageAddressComponent implements OnInit {
  users: any[]=[];
  keyOfuser: any;
  currentUser: any;
  UserDetail: any;
  manageAddressForm!: FormGroup<{ area: FormControl<string | null>; landmark: FormControl<string | null>; city: FormControl<string | null>; pincode: FormControl<string | null>; address: FormArray<FormControl<unknown>>; }>;
  otherAddress: any;

  constructor(private fb: FormBuilder,private dataService:DataService,private auth:AuthService,private _snackBar:MatSnackBar) { 
    
  }

  

  ngOnInit(): void {
   this.retrieveUsers();
   this.auth.getCurrentUser().subscribe((res :any)=>{
    this.currentUser=res;
  });
  this.auth.getuserDetail().subscribe((res:any)=>{
    this.UserDetail=res;
  })
  this.manageAddressForm=this.fb.group({
    area:[this.UserDetail?.defaultAddrees.area,Validators.required],
    landmark:[this.UserDetail?.defaultAddrees.landmark,Validators.required],
    city:[this.UserDetail?.defaultAddrees.city,Validators.required],
    pincode:[this.UserDetail?.defaultAddrees.pincode,[Validators.required,Validators.pattern('[0-9]*')]],
    address:this.fb.array([])
  });
  this.UserDetail.defaultAddrees.otheraddress.map((r:any)=>{
    this.otherAddress={
      area:r.area,
      landmark:r.landmark,
      city:r.city,
      pincode:r.pincode
    }
    console.log(this.otherAddress);
    
  })
  }
  retrieveUsers() {
    this.dataService.getAllUsers().snapshotChanges().pipe(map((changes: any) => {
      return changes.map((c: any) => {
        return { key: c.key, ...c.payload.val() };
      });
    }
    )).subscribe((res: any) => {
      this.users = res;
     this.keyOfuser=this.users.find((r :any)=>{return r.email==this.currentUser})?.key;
     this.UserDetail=this.users.find((r:any)=>r.key==this.keyOfuser);
    },
      (err) => {
        console.log(err);
      });
  }
  get address() {
    return this.manageAddressForm.controls["address"] as FormArray;
  }
  addAddress()
  {
    const data={
      area:this.manageAddressForm.value.area,
      landmark:this.manageAddressForm.value.landmark,
      city:this.manageAddressForm.value.city,
      pincode:this.manageAddressForm.value.pincode,
      otheraddress:this.manageAddressForm.value.address
    }
    this.dataService.updateUser(this.keyOfuser,{defaultAddrees:data}).then((res:any)=>{
      this._snackBar.open('Address Added Succesffully','OK');
    });
   
    const addresses = this.fb.group({
      area: ['', Validators.required],
      landmark: ['', Validators.required],
      city:['',Validators.required],
      pincode:['',Validators.required]
    });
    this.address.push(addresses);
  }
}
