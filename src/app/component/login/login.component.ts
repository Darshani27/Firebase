import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:FormGroup={} as any;
 
  constructor(private auth : AuthService,private data:DataService) { 
   
  }

  ngOnInit(): void {
    this.loginform=new FormGroup(
      {
        'email':new FormControl('',[Validators.required,Validators.email]),
        'password':new FormControl('',Validators.required)
      }
    )
  }
  login()
  {
    const email=this.loginform.get('email')?.value as string;
    const password=this.loginform.get('password')?.value as string;
    this.auth.login(email,password);
    const data :  User={
      email: this.loginform.get('email')?.value,
      password: this.loginform.get('password')?.value,
    };
  }
  signInWithGoogle()
  {
    this.auth.googleSignIn();
  }
  getErrorMessage()
  {
    if ((this.loginform.value.email=='' ||this.loginform.value.password=='')) {
      return 'You must enter a value';
    }

    if(this.loginform.controls['email'].hasError('email'))
    {
      return 'Not a Valid Email';
    }
    return '';
    // kacey28882@canyona.com (verified-email)
  }
}
