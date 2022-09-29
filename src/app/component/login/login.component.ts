import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    // console.log(this.loginform.get('email')?.value);
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
  getErrorMessage()
  {
    if (this.loginform.get('email')?.value=='' && this.loginform.get('password')?.value=='') {
      return 'You must enter a value';
    }

    if(!this.loginform.get('email')?.value?.includes('@'))
    {
      return 'Not a Valid Email';
    }
    return '';
  }
}
