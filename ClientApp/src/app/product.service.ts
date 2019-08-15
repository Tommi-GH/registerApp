import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import { ProductType } from './productType';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private auth : AuthService ) {
    this.baseUrl = this.baseUrl + "api/";
  }

  getTokenHeader(): HttpHeaders{
    var token = this.auth.getAccessToken();
    return new HttpHeaders().set("Authorization", "Bearer " + token);

  }

  getProducts(): any {
    return this.http.get<Product[]>(this.baseUrl+"products/", {'headers': this.getTokenHeader()});
  }

  getProduct(productId: number){
    return this.http.get<Product>(this.baseUrl+"products/"+productId, {'headers': this.getTokenHeader()});
  }

  putProduct(product: Product){
    return this.http.put<Product>(this.baseUrl+"products/" + product.productId, product, {'headers': this.getTokenHeader()});
  }

  postProduct(product: Product){
    return this.http.post<Product>(this.baseUrl+"products/", product, {'headers': this.getTokenHeader()})
  }

  deleteProduct(productId: number){
    return this.http.delete<Product>(this.baseUrl+"products/"+productId, {'headers': this.getTokenHeader()});
  }

  getProductTypes(): any {
    return this.http.get<ProductType[]>(this.baseUrl+"productTypes/", {'headers': this.getTokenHeader()});
  }

  getProductType(productTypeId: number){
    return this.http.get<ProductType>(this.baseUrl+"productTypes/"+productTypeId, {'headers': this.getTokenHeader()});
  }

  putProductType(productType: ProductType){
    return this.http.put<ProductType>(this.baseUrl+"productTypes/" + productType.productTypeId, productType, {'headers': this.getTokenHeader()});
  }

  postProductType(productType: ProductType){
    return this.http.post<ProductType>(this.baseUrl+"productTypes/", productType, {'headers': this.getTokenHeader()});
  }

  deleteProductType(productTypeId: number){
    return this.http.delete<ProductType>(this.baseUrl+"productTypes/"+ productTypeId, {'headers': this.getTokenHeader()});
  }

}
