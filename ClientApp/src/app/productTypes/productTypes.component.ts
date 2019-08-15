import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductType } from '../ProductType';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-productTypes',
  templateUrl: './productTypes.component.html',
  styleUrls: ['./productTypes.component.css']
})
export class ProductTypesComponent implements OnInit {
  private productTypes: ProductType[];
  private model = new ProductType(1,"");
  displayedColumns: string[] = ['productTypeId', 'name'];

  constructor(private productService: ProductService, private auth : AuthService) { }

  ngOnInit() {
    this.getProductTypes();

    if (this.auth.userHasScopes(['write:product'])){
      this.displayedColumns.push('options');
    }
  }

  getProductTypes() {
    this.productService.getProductTypes().subscribe(result => {
      this.productTypes = result;
      if (this.productTypes.length > 0){
        this.model.productTypeId = this.productTypes[this.productTypes.length-1].productTypeId+1;
      }
    })
  }

  onSubmit() {
    this.productService.postProductType(this.model).subscribe(result => {
      if (this.productTypes.length > 0){
        this.model = new ProductType(this.productTypes[this.productTypes.length-1].productTypeId+1,"Type name");
      }
      this.getProductTypes();
    });
  }

  editProductType(productType){
    this.productService.putProductType(productType).subscribe(result=>{
      this.getProductTypes();
    });
  }

  deleteProductType(productTypeId){
    this.productService.deleteProductType(productTypeId).subscribe(result=>{
      this.getProductTypes();
    });
  }

}
