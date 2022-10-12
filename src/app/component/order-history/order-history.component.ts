import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
  orders: any[]=[];
  list:any[]=[];
  columnsToDisplay=['name','category','quantity','price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  constructor(private dialog:MatDialog,private router:Router,private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getAllOrders().valueChanges().subscribe((res)=>{
      this.orders=res.map((item)=>{return item.products});
      this.list=this.orders.flat(1);
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
  getTotalCost() {
    // return this.list.map(t => parseInt(t.price as any)*(t.quantity as any)).reduce((acc: any, value: any) => acc + value, 0);
  }
}
