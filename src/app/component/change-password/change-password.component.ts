import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { CustomValidators } from 'src/app/CustomValidators';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:FormGroup={} as any;
  users: any[]=[];
  currentUser: any;
  keyOfUser: any;
  constructor(private fieauth:AngularFireAuth,private _snackBar:MatSnackBar,private dataService:DataService,private auth:AuthService) { }

  ngOnInit(): void {
    this.changePasswordForm=new FormGroup(
      {
        'currentpassword': new FormControl('',Validators.required),
        'newpassword':new FormControl('',Validators.required),
        'confirmpassword':new FormControl('',Validators.required)
      },
      [CustomValidators.MatchValidator('newpassword', 'confirmpassword')]
    );
    this.getUsers();
    this.auth.getCurrentUser().subscribe((res:any)=>{
      this.currentUser=res;
    });
  }
  getUsers() {
    this.dataService.getAllUsers().snapshotChanges().pipe(map((changes: any) => {
      return changes.map((c: any) => {
        return { key: c.key, ...c.payload.val() };
      });
    }
    )).subscribe((res: any) => {
      this.users = res;
      this.keyOfUser=this.users.find((r:any)=>{ return r.email==this.currentUser })?.key

    },
      (err :any) => {
        console.log(err);
      });
  }
  get ErrorMessage()
  {
       return (this.changePasswordForm.getError('mismatch') &&
      this.changePasswordForm.get('confirmpassword')?.touched);
  }
  submit()
  {
    const data={password:this.changePasswordForm.value.confirmpassword};
    if(this.changePasswordForm.value.confirmpassword !='')
    {
      this.dataService.updatePassword(this.keyOfUser,data).then((res:any)=>{
        this._snackBar.open('Password Changed SuccessFully','OK');
        this.resetForm();
        this.sendResetPasswordEmail(this.currentUser);
        this.getUsers();
      });
    }
    
    }
  sendResetPasswordEmail(userEmail:any) {
    this.fieauth.sendPasswordResetEmail(userEmail).then((res:any)=>
    {
      this._snackBar.open('Pasword Reset Email Sent on Registered Email','OK');
    });
    
  }
  resetForm() {
    this.changePasswordForm.value.newpassword='';
    this.changePasswordForm.value.currentpassword='';
    this.changePasswordForm.value.confirmpassword='';
  }

  getErrorMessage()
  {
    if(this.changePasswordForm.value.newpassword=='' || this.changePasswordForm.value.currentpassword==''||this.changePasswordForm.value.confirmpassword=='')
    {
      return 'You must Enter Value';
    }
    return '';
  }

}
