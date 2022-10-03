import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {GoogleAuthProvider} from '@angular/fire/auth'
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fieauth : AngularFireAuth, private router:Router,private _snackbar:MatSnackBar) { }
  login(email:any,password:any)
  {
    this.fieauth.signInWithEmailAndPassword(email,password).then((res)=>
    {
      localStorage.setItem('token','true');
      if(res.user?.emailVerified==true)
      {
      this.router.navigate(['/product-list']);
      }
      else{
        this.router.navigate(['/verify-email']);
      }
    },
    (err)=>{
      this._snackbar.open('Invalid Username/Password','OK');
      this.router.navigate(['/login']);
    });
  }

  register(email:string,password:string)
  {
    this.fieauth.createUserWithEmailAndPassword(email,password).then((res)=>{
      this._snackbar.open('User Registered SuccessFully','OK');
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
    },
    (err)=>{
      alert(err.message);
      this.router.navigate(['/register']);
    });
  }

  logout()
  {
    this.fieauth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    },(err)=>{
      alert(err.message);
    });
  }
  googleSignIn()
  {
    return this.fieauth.signInWithPopup(new GoogleAuthProvider).then((res)=>{
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    },
    (err)=>{
      alert(err.message)
    });
  }
  forgotPassword(email :string)
  {
    this.fieauth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/verify-email']);
    },
    (err)=>{
      alert(err.message);
    })
  }
  sendEmailForVerification(user:any)
  {
    user.sendEmailVerification().then((res:any)=>{
      this.router.navigate(['/verify-email']);
    },
    (err :any)=>{
      alert(err.message)
    })
  }
}
