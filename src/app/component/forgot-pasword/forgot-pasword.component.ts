import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-forgot-pasword',
  templateUrl: './forgot-pasword.component.html',
  styleUrls: ['./forgot-pasword.component.css']
})
export class ForgotPaswordComponent implements OnInit {
  forgotPasswordForm:FormGroup={} as any;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.forgotPasswordForm=new FormGroup({
      'email':new FormControl('',Validators.required)
    })
  }
  forgotPassword()
  {
    const email=this.forgotPasswordForm.value.email;
    this.auth.forgotPassword(email);
  }
  getErrorMessage()
  {
    if(this.forgotPasswordForm.value.email=='')
    {
      return 'Please enter Value';
    }
    return '';
  }
}



