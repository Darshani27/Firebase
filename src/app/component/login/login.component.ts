import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email : string='';
  password:string='';

  constructor(private auth : AuthService,private data:DataService) { }

  ngOnInit(): void {
  }
  login()
  {
    if(this.email=='')
    {
      alert('Please enter Email');
      return;
    }
    if(this.password=='')
    {
      alert('Please enter Password');
      return;
    }

    this.auth.login(this.email,this.password);
    const data : User={
      email: this.email,
      password: this.password,
      
    }
    this.data.create(data);

  }
  signInWithGoogle()
  {
    this.auth.googleSignIn();
  }
}
