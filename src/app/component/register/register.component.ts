import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  registerForm:FormGroup={} as any;


  constructor(private auth :AuthService,private data:DataService) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      'email':new FormControl('',[Validators.email,Validators.required]),
      'password':new FormControl('',Validators.required),
      'FirstName':new FormControl('',Validators.required),
      'LastName':new FormControl('',Validators.required)
    })
  }
  register()
  {
    const email=this.registerForm.get('email')?.value;
    const password=this.registerForm.get('password')?.value;
    this.auth.register(email,password);
    const data : User={
      email:email,
      password:password
    }
    this.data.create(data);
  }
  getErrorMessage()
  {
    if(this.registerForm.get('email')?.value=='' && this.registerForm.get('password')?.value=='')
    {
      return 'Please Enter Value';
    }
    if(!this.registerForm.get('email')?.value?.includes('@'))
    {
      return 'Not a Valid Email';
    }
    return '';
  }
}
