import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, from, map, Observable, throwError } from 'rxjs';
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
  uploadProgress: Observable<number>|undefined;
  downloadURL!: Observable<String>;
  path: AngularFireStorageReference={}  as any;
  result: boolean=false;
 
  constructor(private afStorage:AngularFireStorage,private auth:AuthService,private db:AngularFireDatabase,private dataService:DataService,private _snackbar:MatSnackBar) {
   
  }
    

  ngOnInit(): void {
   this.getUsers();
    this.auth.getCurrentUser().subscribe((res :any)=>{
      this.currentUser=res;
    });
    this.userForm=new FormGroup({
      'email':new FormControl(this.currentUser),
      'userImage':new FormControl('')
    }); 

     this.userForm.valueChanges.subscribe((res:any)=>{
     this.data={...res};
   });
   this.path=this.afStorage.ref('/images/' + this.currentUser);
   if(this.path !=undefined)
   {
    this.path.getDownloadURL().subscribe((res:any)=>{
      this.downloadURL=res;
     },(error)=>{
      console.log(error.message);
      this.afStorage.ref('/images/').getDownloadURL().subscribe((res:any)=>{
        this.downloadURL=res;
      })
      // alert('Please upload image');
      this._snackbar.open('Please upload profile image','OK');
     });
   }
   
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
    this.keyOfUser=this.users.find((r)=>{return r.email==this.currentUser})?.key;

  },
  (err)=>{
    console.log(err);
  });
}
upload(event:any)
{
  this.ref = this.afStorage.ref('/images/' + this.currentUser);
  this.task = this.ref.put(event.target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = this.ref.getDownloadURL())
    ).subscribe((res:any)=>{
      console.log(res); 
    });
}
}
