import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  products:Product[]=[];
  result:boolean=false;
  message: string="Are you sure you want to logout ?";
  title: string="Confirm Action";
  constructor(private dataService:DataService,private dialog:MatDialog,private auth:AuthService) { }

  ngOnInit(): void {
    this.retrieveProducts();

  }
  retrieveProducts() {
    this.dataService.getAll().valueChanges().subscribe((res)=>{
      this.products=res;
    });
  }
  addToCart()
  {

  }
  signOut()
  {
    const dialogRef=this.dialog.open(ConfirmDialogComponent,
      {
        maxWidth: "400px",
        data:{title:this.title,message:this.message}
      });
      dialogRef.afterClosed().subscribe((res : any)=>{
        this.result=res;
        console.log(this.result);
        
      })
    if(this.result)
    {
     this.auth.logout();
    }
  }

}
