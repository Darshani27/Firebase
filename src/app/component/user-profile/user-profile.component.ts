import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, from, map, Observable } from 'rxjs';
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
  path: string | undefined;
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
  //  console.log(this.downloadURL);
   
  this.downloadURL = this.afStorage.ref(`/images/${this.currentUser}`).getDownloadURL();

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
    });
}
}
