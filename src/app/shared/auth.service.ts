import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {GoogleAuthProvider} from '@angular/fire/auth'
import { MatSnackBar } from '@angular/material/snack-bar';
import { from, Observable } from 'rxjs';
import { DataService } from './data.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: any[]=[];

  constructor(private fieauth : AngularFireAuth, private router:Router,private _snackbar:MatSnackBar,private db:AngularFireDatabase) {
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
      localStorage.setItem('token','true');
      const adminEmail=this.users.find((r)=>r.isAdmin==true)?.email;
      if(res.user?.emailVerified==true)
      {
        if(adminEmail == email)
        {
          this.router.navigate(['/product-list']);
        }
        else if(adminEmail!=undefined)
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
