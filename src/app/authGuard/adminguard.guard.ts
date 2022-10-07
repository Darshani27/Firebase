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
  constructor(private auth:AuthService,private router:Router,private db:AngularFireDatabase)
  {
   
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    return true;
  }
  
}
