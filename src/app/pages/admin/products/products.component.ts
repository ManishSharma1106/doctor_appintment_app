import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  
  isSidePanelVisible:boolean = false;
  productObj:any={
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl": ""
  }

  categoryList:any=[];
  allProducts:any=[];

  constructor( private productSrv: ProductService){

  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getProducts();
  }

  getProducts(){
    this.productSrv.getAllProducts().subscribe((res:any)=>{
           console.log(res.data);
           this.allProducts = res.data;
    })
  }

  getAllCategory(){
    this.productSrv.getCategory().subscribe((res:any)=>{
      console.log(res);
      this.categoryList = res.data;
    })
  }

  onSave(){
    this.productSrv.postSaveProduct(this.productObj).subscribe((res:any)=>{
          if(res.result){
            alert('Product Created');
            this.getProducts();
          }else {
            alert(res.message);
          }
    });
  }

  openSidePanel(){
    this.isSidePanelVisible = true;
  }

  closeSidePanel(){
    this.isSidePanelVisible = false;
  }
}
