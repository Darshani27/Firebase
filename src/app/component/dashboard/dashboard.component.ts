import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { DataService } from 'src/app/shared/data.service';


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
    this.dataService.createProduct(this.product).then((res: any)=>{
      this.submitted=true;
      // console.log('created');
      console.log(this.submitted);
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
    if(this.productForm.value.productprice==''||this.productForm.value.productcategory=='' || this.productForm.value.productname=='')
    {
      return 'Please enter value';
    }
    if(this.productForm.value.productprice != ""&& this.productForm.controls['productprice'].hasError('pattern'))
    {
      return 'Invalid Price';
    }
    return'';
  }
}
