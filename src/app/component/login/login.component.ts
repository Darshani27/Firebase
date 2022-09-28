import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  loginform=new FormGroup(
    {
      'email':new FormControl('',Validators.required),
      'password':new FormControl('',Validators.required)
    }
  )
  constructor(private auth : AuthService,private data:DataService) { 
   
  }

  ngOnInit(): void {
  }
  login()
  {
    const email=this.loginform.get('email')?.value as string;
    const password=this.loginform.get('password')?.value as string;
    console.log(this.loginform.get('email')?.value);
    this.auth.login(email,password);
    const data : any={
      email: this.loginform.get('email')?.value,
      password: this.loginform.get('password')?.value,
    }
    this.data.create(data);

  }
  signInWithGoogle()
  {
    this.auth.googleSignIn();
  }
  get loginFormControl()
  {
    return this.loginform.controls;
  }
}
