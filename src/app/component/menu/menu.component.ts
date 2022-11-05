import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import { CartServiceService } from 'src/app/shared/cart-service.service';
import { DataService } from 'src/app/shared/data.service';
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
  adminKey: any;
  inActiveMembers: any[]=[];
  inactiveEmails: any[]=[];
  isInactive: boolean=false;
  ref: AngularFireStorageReference={} as any;
  task: AngularFireUploadTask={} as any;
  downloadURL!: Observable<String>;
  products:any[]=[];
  items:any[]=[];
  ProdData: any;
  categories: any[]=[];
  hasError: any;
  constructor(private afStorage:AngularFireStorage,private dataService:DataService,private cartService:CartServiceService,private bootomsheet:MatBottomSheet,private dialog:MatDialog,private auth:AuthService,private route:Router,private url:LocationStrategy,private db:AngularFireDatabase){
    const ref=this.db.list('users');
    ref.valueChanges().subscribe((res)=>{
      this.users=res;
    });
    this.auth.getdownloadurl().subscribe((res:any)=>{
      this.downloadURL=res;
    });
  }
  hasRoute(route: string) {
    return this.route.url.includes(route);
  }
  ngOnInit(): void {
    this.dataService.getprodData().subscribe((res:any)=>{
      this.ProdData=res;
    });
    this.auth.getisError().subscribe((res:any)=>{
      this.hasError=res;
    })
    this.cartService.getItemInCart().subscribe((res:any)=>{
      this.itemInCart=res;
    });
    this.getUsers();
    this.auth.getCurrentUser().subscribe((res :any)=>
   {
    this.inActiveMembers=this.users.filter((r:any)=>r.isActive==false);
    this.inactiveEmails=this.inActiveMembers.map((r:any)=>{
       return r.email;
     });
     if(this.inactiveEmails.includes(res))
     {
      this.currentUser='';
     }
     else
     {
      this.currentUser=res;
     }
   }
    );
    this.retrieveCategories();
  }
  retrieveCategories() {
    this.dataService.getCategories().snapshotChanges().pipe(
      map((changes: any[])=>{
        return changes.map(c=>{
          return {key:c.key,...c.payload.val()};
        })   
      })
     ).subscribe((data : any)=>{
      this.categories=data.map((r:any)=>{ return r.category});
     },(err)=>{
      alert(err.message);
     });
     console.log(this.categories);
     
  }
  getUsers() {
    this.dataService.getAllUsers().snapshotChanges().pipe(map((changes: any) => {
      return changes.map((c: any) => {
        return { key: c.key, ...c.payload.val() };
      });
    }
    )).subscribe((res: any) => {
      this.users = res;
     this.adminKey= this.users.find((r:any)=>r.role=="admin")?.email;
    },
      (err :any) => {
        console.log(err);
      });

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

  sort(event: any) {
    switch (event.target.value) {
      case "Low":
        {

          this.ProdData = this.ProdData.sort((low: { price: number; }, high: { price: number; }) => low.price - high.price);
          break;
        }

      case "High":
        {
          this.ProdData = this.ProdData.sort((low: { price: number; }, high: { price: number; }) => high.price - low.price);
          break;
        }

      // case "":
      //   {
      //     this.ProdData = this.ProdData.sort(function (low: {
      //       category
      //       : string  }, high: {
      //       category
      //       : string; }) {
      //       if (low.category
      //         < high.category) {
      //         return -1;
      //       }
      //       else if (low.category> high.category) {
      //         return 1;
      //       }
      //       else {
      //         return 0;
      //       }
      //     })
      //     break;
      //   }

      default: {
        if(this.categories.includes(event.target.value))
          {
            this.ProdData = this.ProdData.sort(function (low: {
                    category
                    : string  }, high: {
                    category
                    : string; }) {
                    if (low.category
                      < high.category) {
                      return -1;
                    }
                    else if (low.category> high.category) {
                      return 1;
                    }
                    else {
                      return 0;
                    }
                  });
          //  this.ProdData = this.ProdData.sort((low: { price: number; }, high: { price: number; }) => low.price - high.price); 
            // console.log(this.ProdData);
          }
          else
          {
        this.ProdData = this.ProdData.sort((low: { price: number; }, high: { price: number; }) => low.price - high.price);
          }
        break;
      }
    }
    this.dataService.setprodData(this.ProdData);
    return this.ProdData;


  }

}
