import { animate, state, style, transition, trigger } from '@angular/animations';
import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
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
  mylist:any[]=[];
  a:any[]=[];

  columnsToDisplay=['description','price'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  modifiedList: any;
  constructor(private dialog:MatDialog,private router:Router,private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getAllOrders().valueChanges().subscribe((res)=>{
      this.orders=res.map((item)=>{return item.products});
      const elements=this.orders.map((r)=>{return r.length});
      const totalCost=this.getTotalCost(this.orders);
      for(var i=0 ,j=0;i<elements.length;i++)
      {
        this.list.push({description:'Your Previous Orders item No.:' +elements[i],price:totalCost[i]});
        if(elements[i]==this.orders[i].length)
        {
          this.list.concat(this.orders[i]);
        }
      }
      this.mylist=this.list;
      // for(var i=0;i<this.orders.length;i++)
      // {
      //   this.a.push(this.orders[i].map((r: any)=>{
      //     return {name:r.name,category:r.category,price:r.price};
      //   }));
      // }
      console.log(this.mylist);
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
  getTotalCost(orders:any) {
    return orders.map((item:any)=>{
      return item.map((t :any)=>{
        return parseInt(t.price) *t.quantity
      }).reduce((acc:any,value:any)=>acc+value,0);
    });
    // return this.list.map(t => parseInt(t.price as any)*(t.quantity as any)).reduce((acc: any, value: any) => acc + value, 0);
  }
}
