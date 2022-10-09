import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  currentUserEmail:string='';
  adminEmailId:string='';
  users: any[]=[];
  constructor(private auth:AuthService,private router:Router)
  {
   
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
   let url:string=state.url;
   return this.checkUser(next,url);
    
  }
  checkUser(route: ActivatedRouteSnapshot, url: string): boolean {
    const userRole=this.auth.getRole();
    if(this.auth.isLoggedIn())
    {
      if(route.data['role'] && route.data['role'].indexOf(userRole)===-1)
    {
      this.router.navigate(['/page-not-found']);
      return false;
    }
    return true;
    }
    
    this.router.navigate(['/login']);
    return false;
 
  }
  
}
