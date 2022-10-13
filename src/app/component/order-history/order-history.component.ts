import { animate, state, style, transition, trigger } from '@angular/animations';
import { isNgTemplate, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderHistoryComponent implements OnInit {
  title:string="Confirm Action";
  message:string="Are you sure you want to close this ?";
  result: boolean=false;
  list:any[]=[];

  columnsToDisplay=['key','totalAmount','address','date'];
  displayedColumns=['name','category','quantity','price']
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  modifiedList: any;
  users: any;
  usersId:any;
  currentUser: any;
  keyOfuser:any
  mylist: any[]=[];
  adminKey: any;
  constructor(private auth:AuthService,private dialog:MatDialog,private router:Router,private dataService:DataService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getOrders();
    this.auth.getCurrentUser().subscribe((res :any)=>{
      this.currentUser=res;
    }); 
  }
  getUsers()
  {
   this.dataService.getAllUsers().snapshotChanges().pipe(map((changes: any) => {
     return changes.map((c: any) => {
       return { key: c.key, ...c.payload.val() };
     });
   }
   )).subscribe((res: any) => {
     this.users = res;
    this.keyOfuser=this.users.find((r :any)=>{return r.email==this.currentUser})?.key;
    this.adminKey= this.users.find((r:any)=>r.role=="admin")?.key;
   },
     (err) => {
       console.log(err);
     });
  }
  getOrders() {
    console.log(this.keyOfuser);
    this.dataService.getAllOrders().snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => {
          return { key: c.key, ...c.payload.val() };
        })
      })
    ).subscribe((res: any) => {
      this.usersId=res.map((r:any)=>{return r.useId});
        res.forEach((item:any)=>{
          if(item.useId==this.keyOfuser)
          {
            this.list.push(item);
          }
          else if(this.adminKey==this.keyOfuser)
          {
            this.list=res||[];
          }
        });
        this.mylist=this.list;      
    });
  }
    
  onClose()
  {
    const ref=this.dialog.open(ConfirmDialogComponent,{
      width:"400px",
      height:"400px",
      data:{title:this.title,message:this.message}
    });
    ref.afterClosed().subscribe((res:any)=>{
      this.result=res;
      if(this.result)
      {
        this.router.navigate(['/login']);
      }      
    });
  }
  getTotalCost(orders:any) {
    return orders.map((item:any)=>{
      return item.map((t :any)=>{
        return parseInt(t.price) *t.quantity
      }).reduce((acc:any,value:any)=>acc+value,0);
    });
  }
}
