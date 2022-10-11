import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  title:string="Confirm Action";
  message:string="Are you sure you want to close this ?";
  result: boolean=false;

  constructor(private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
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
}
