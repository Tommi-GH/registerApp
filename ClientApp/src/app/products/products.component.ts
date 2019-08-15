import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ProductType } from '../productType';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  private products : Product[];
  private model = new Product(0,'name',1,new Date(),new Date());
  private productTypes : ProductType[];
  private displayedColumns = ['productId','name','productType','startDate','endDate']

  constructor(private productService: ProductService, private auth : AuthService) {  }

  ngOnInit(){
    this.getProducts();
    this.getProductTypes();
    if (this.auth.userHasScopes(['write:product'])){
      this.displayedColumns.push('options');
    }
  }

  getProducts(){
    this.productService.getProducts().subscribe(result =>{
      this.products= result;
      if (this.products.length > 0){
        this.model.productId = this.products[this.products.length-1].productId+1
      }
    });
  }

  getProductTypes() {
    this.productService.getProductTypes().subscribe(result => {
      this.productTypes = result;
    })
  }

  onSubmit() {
    this.productService.postProduct(this.model).subscribe(result => {
      this.model = new Product(0,'name',1,new Date(),new Date());
      this.getProducts();
    });
  }

  editProduct(product){ 
    this.productService.putProduct(product).subscribe(result=>{
      this.getProducts();
    });
  }

  deleteProduct(productId){
    this.productService.deleteProduct(productId).subscribe(result=>{
      this.getProducts();
    });
  }

  getProductTypeName(productTypeId){
    for (var product of this.productTypes){
      if (product.productTypeId == productTypeId){
        return product.name;
      }
    }
    return "*Type removed*"
  }

}
