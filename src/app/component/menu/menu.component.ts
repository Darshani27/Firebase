import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { CartServiceService } from 'src/app/shared/cart-service.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dialogtitle: any='Confirm Action';
  message: any='Are you sure you want to logout ?';
  result:boolean=false;
  btnVisible:boolean=true;
  router:string='';
  users: any[]=[];
  currentUser: string='';
  itemInCart:any;
  cartQty: any;

 
  constructor(private cartService:CartServiceService,private bootomsheet:MatBottomSheet,private dialog:MatDialog,private auth:AuthService,private route:Router,private url:LocationStrategy,private db:AngularFireDatabase){
    const ref=this.db.list('users');
    ref.valueChanges().subscribe((res)=>{
      this.users=res;
    });
    console.log(this.users);
 
  }
  hasRoute(route: string) {
    return this.route.url.includes(route);
  }
  ngOnInit(): void {
   this.auth.getCurrentUser().subscribe((res :any)=>
   {
    this.currentUser=res;
   }
    );
    this.cartService.getItemInCart().subscribe((res:any)=>{
      this.itemInCart=res;
    })
  }
  openProfile()
  {
    this.bootomsheet.open(UserProfileComponent);
  }
  
  signOut()
  {
    const dialogRef=this.dialog.open(ConfirmDialogComponent,
      {
        maxWidth: "400px",
        data:{title:this.dialogtitle,message:this.message}
      });
      dialogRef.afterClosed().subscribe((res : any)=>{
        this.result=res;
        console.log(this.result);
        if(this.result)
        {
         this.auth.logout();
        }
      });
  }

  homeRedirect()
  {
    this.route.navigate(['/home']);
  }

}
