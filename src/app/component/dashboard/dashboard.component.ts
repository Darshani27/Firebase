import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/data.service';

export class Product{
  name : string='';
  key?:string| undefined;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  product:Product={} as any;
  submitted:boolean=false;
  productForm:FormGroup={} as any;
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.productForm=new FormGroup({
      'productname': new FormControl('',Validators.required),
      'productprice': new FormControl('',[Validators.required,Validators.pattern('[0-9]*')]),
      'productcategory':new FormControl('',Validators.required)
    })
  }
  
  saveProduct()
  {
    this.product={
    name:this.productForm.value.productname,
    price:this.productForm.value.productprice,
    category:this.productForm.value.productcategory
   } as any;
  // console.log(this.productForm.value);

    this.dataService.createProduct(this.product).then((res: any)=>{
      console.log('created');
      this.submitted=true;
    })
  }

  newProduct()
  {
    // this.product=new Product();
     this.product={} as any;
     this.submitted=false;
  }

  submittedMessage()
  {
    return 'You have submitted successfully !'
  }
  getErrorMessage()
  {
    if(this.productForm.value.productname=='' || this.productForm.value.productprice==''||this.productForm.value.productcategory=='')
    {
      return 'Please enter value';
    }
    return'';
  }
}
