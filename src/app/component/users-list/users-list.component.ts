import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'email','action'];
  keyOfuser: any;
  users: any[]=[];
  adminKey: any;
  currentUser: any;
  title:string="Confirm Action";
  message:string="Are you sure you want to disable ?";
  result: boolean=false;
  btnDisable: boolean=false;
  // checked:boolean=true;

  constructor(private dataService:DataService,private dialog:MatDialog,private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers()
  {
   this.dataService.getAllUsers().snapshotChanges().pipe(map((changes: any) => {
     return changes.map((c: any) => {
       return { key: c.key, ...c.payload.val() };
     });
   }
   )).subscribe((res: any) => {
     this.users = res || [];
     this.keyOfuser=this.users.find((r :any)=>{return r.email==this.currentUser})?.key;
     this.adminKey= this.users.find((r:any)=>r.role=="admin")?.key;
    //  this.users.filter((r:any)=>{
    //   r.isActive==false
    //  });
   },
     (err) => {
       console.log(err);
     });
  }

  enableDisable(item:any)
  {
    if(item.isActive==true)
    {
      const dialogRef=this.dialog.open(ConfirmDialogComponent,
        {
          maxWidth: "400px",
          data:{title:this.title,message:this.message}
        });
        dialogRef.afterClosed().subscribe((res :any)=>
        {
          this.result=res;
          if(this.result)
          {
                item.isActive=false;
                const data={...item,isActive:false};
                this.dataService.updateUser(item.key,data).then((res)=>{
                this._snackBar.open('User Disabled Successfully','OK');
                this.getUsers();
                }); 
          }
        });
    }
    else if(item.isActive==false){
      const dialogRef=this.dialog.open(ConfirmDialogComponent,
        {
          maxWidth: "400px",
          data:{title:this.title,message:'Are You Sure You Want to Enable ?'}
        });
        dialogRef.afterClosed().subscribe((res :any)=>
        {
          this.result=res;
          if(this.result)
          {
                item.isActive=true;
                const data={...item,isActive:true};
                this.dataService.updateUser(item.key,data).then((res)=>{
                this._snackBar.open('User Enabled Successfully','OK');
                this.getUsers();
                }); 
          }
        });

    }
   
  }
}
