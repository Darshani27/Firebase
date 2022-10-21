import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userForm:FormGroup={} as any;
  currentUser:string='';
  users:any[]=[];
  data: any={} as any;
  keyOfUser: any;
  ref: AngularFireStorageReference={} as any;
  task: AngularFireUploadTask={} as any;

  constructor(private afStorage:AngularFireStorage,private auth:AuthService,private db:AngularFireDatabase,private dataService:DataService,private _snackbar:MatSnackBar) {
   
  }
    

  ngOnInit(): void {
   this.getUsers();
    this.auth.getCurrentUser().subscribe((res :any)=>{
      this.currentUser=res;
    });
    this.userForm=new FormGroup({
      'email':new FormControl(this.currentUser),
    }); 

     this.userForm.valueChanges.subscribe((res:any)=>{
     this.data={...res};
   });
  }
  update()
  { 
    this.keyOfUser=this.users.find((r)=>{return r.email==this.currentUser})?.key;
    this.dataService.updateEmail(this.keyOfUser,this.data).then(()=>{
      this._snackbar.open('Email Updated SuuccessFully','OK');
    });
  }
getUsers()
{
  this.dataService.getAllUsers().snapshotChanges().pipe(map((changes :any)=>
  {
    return changes.map((c :any)=>{
     return  {key:c.key,...c.payload.val()};
    });
  }
  )).subscribe((res:any)=>{
    this.users=res;
  },
  (err)=>{
    console.log(err);
  });
}
upload(event:any)
{

}
}
