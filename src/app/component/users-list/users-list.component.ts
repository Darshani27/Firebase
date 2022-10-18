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
   },
     (err) => {
       console.log(err);
     });
  }

  enableDisable(item:any)
  {
    console.log(item);
    
    const dialogRef=this.dialog.open(ConfirmDialogComponent,
      {
        maxWidth: "400px",
        data:{title:this.title,message:this.message}
      });
      dialogRef.afterClosed().subscribe((res :any)=>
      {
        this.result=res;
        // if(this.result)
        // {
        //   this.dataService.deleteUser(item.key).then((res)=>{
        //       this._snackBar.open('User Disabled Successfully','OK');
        //       this.getUsers();
        //   });
        // }
      });
  }
}