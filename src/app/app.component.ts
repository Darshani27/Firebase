import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-firebase';
  currentUser!: string;
  downloadURL: any;
  constructor(private afStorage:AngularFireStorage)
  {
    // this.afStorage.ref('/images/' + this.currentUser).getDownloadURL().subscribe((res:any)=>{
    //   this.downloadURL=res;
    //  });
  }
  
  
}
