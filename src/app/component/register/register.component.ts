import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/CustomValidators';
import { User } from 'src/app/models/user.model';
import { MustMatch } from 'src/app/MustMatch';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  registerForm:FormGroup={} as any;


  constructor(private auth :AuthService,private data:DataService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.registerForm=this.formBuilder.group({
      'email':new FormControl('',[Validators.email,Validators.required]),
      'password':new FormControl('',[Validators.required,Validators.minLength(8)]),
      'confirmpassword':new FormControl('',Validators.required),
      'firstName':new FormControl('',Validators.required),
      'lastName':new FormControl('',Validators.required)},
      {
        validator:MustMatch('password','confirmpassword')
      }
      // [CustomValidators.MatchValidator('password', 'confirmpassword')]
   )
  }
  get f() { return this.registerForm.controls; }

  get ErrorMessage()
  {
       return (this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmpassword')?.touched);
  }
  
  register()
  {
    const email=this.registerForm.get('email')?.value;
    const password=this.registerForm.get('password')?.value;
    const confirmpassword=this.registerForm.get('confirmpassword')?.value;
    if(this.registerForm.get('email')?.value!='' && this.registerForm.get('password')?.value!='' && this.registerForm.value.firstName!='')
    {
    this.auth.register(email,password);
    }
    const data : any={
      email:email,
      password:password,
      firstName:this.registerForm.value.firstName,
      confirmpassword:this.registerForm.value.confirmpassword
    }
    if(data.email!='' && data.password !=''&& data.firstName!='' && data.confirmpassword!='')
    {
    this.data.create(data);

    }
  }
}
