import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {GoogleAuthProvider} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fieauth : AngularFireAuth, private router:Router) { }
  login(email:any,password:any)
  {
    this.fieauth.signInWithEmailAndPassword(email,password).then(()=>
    {
      localStorage.setItem('token','true');
      this.router.navigate(['/dashboard']);
    },
    (err)=>{
      alert('Something Went Wrong');
      this.router.navigate(['/login']);
    });
  }

  register(email:string,password:string)
  {
    this.fieauth.createUserWithEmailAndPassword(email,password).then(()=>{
      alert('Registered Successfully');
      this.router.navigate(['/login']);
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
}
