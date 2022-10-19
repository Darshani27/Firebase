import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {GoogleAuthProvider} from '@angular/fire/auth'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, Subject } from 'rxjs';
import { LocationStrategy } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: any[]=[];
  adminEmail:string='';
  currentUser:any=new BehaviorSubject('');
  adminEmailId:any=new BehaviorSubject('');
  roleAs: any;
  isLogin: boolean=false;
  inactiveEmail: any;
  inActiveMembers:any[]=[];
  inactiveEmails: any;
  

  constructor(private locationStrategy:LocationStrategy,private fieauth : AngularFireAuth, private router:Router,private _snackbar:MatSnackBar,private db:AngularFireDatabase) {
     const ref=this.db.list('users');
       ref.valueChanges().subscribe((res)=>{
         this.users=res;
       });
       console.log(this.users);
    
   }

  login(email:any,password:any)
  {
    this.fieauth.signInWithEmailAndPassword(email,password).then((res)=>
    {
      sessionStorage.setItem('token','true');
      this.adminEmail=this.users.find((r)=>r.role=="admin")?.email;
      this.inActiveMembers=this.users.filter((r:any)=>r.isActive==false);
      this.inactiveEmails=this.inActiveMembers.map((r:any)=>{
        return r.email;
      })
      if(res.user?.emailVerified==true)
      {
        if(this.adminEmail == email)
        {
          sessionStorage.setItem("role", "admin");
          this.router.navigate(['/product-list']);
        }
        else if(this.adminEmail!=undefined && !(this.inactiveEmails.includes(email)))
        {
          this.router.navigate(['/user-dashboard']);
        }
      }
      else{
        this.router.navigate(['/verify-email']);
      }
    },
    (err)=>{
      this._snackbar.open('Invalid Username/Password','OK');
      this.router.navigate(['/login']);
    });
    this.currentUser.next(email);
    this.adminEmailId.next(this.adminEmail);
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
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      this.router.navigate(['/login']);
    },(err)=>{
      alert(err.message);
    });
    this.currentUser.next('');
  }
  googleSignIn()
  {
    return this.fieauth.signInWithPopup(new GoogleAuthProvider).then((res)=>{
      this.router.navigate(['/dashboard']);
      sessionStorage.setItem('token',JSON.stringify(res.user?.uid));
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
  getCurrentUser()
  {
    return this.currentUser;
  }
  getAdminEmailId()
  {
    return this.adminEmailId;
  }
  getRole() {
    this.roleAs = sessionStorage.getItem('role');
    return this.roleAs;
  }
  isLoggedIn() {
    const loggedIn = sessionStorage.getItem('token');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }
  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      return history.pushState(null, '', location.href);
    })
  }
}
// vuriwe@cyclelove.cc