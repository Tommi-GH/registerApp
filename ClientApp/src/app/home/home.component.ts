import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { ProductType } from '../productType';
import { PieData, Dataset } from './pieData';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
 
  
  private products : Product[];
  private productTypes : ProductType[];
  private expireThisMonth : number;
  private expireNextMonth : number;
  private expired : number;
  private expireLater : number;
  private data : PieData;
  private options = {
    legend:{
      position: 'left'
    }
  }


  constructor(private productService : ProductService, private auth : AuthService) { }

  countProductsByType(): number[] {
    var amounts = [];
    var amount : Product[];
    for (let pType of this.productTypes){
      amount = this.products.filter(product => product.productTypeId == pType.productTypeId)
      amounts.push(amount.length);
    }
    return amounts;
  }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.getProducts();
    }
  }

  getProducts() {
    
    this.productService.getProducts().subscribe(result =>{
    this.products = result;
    this.getProductTypes();
  });
  }

  getProductTypes() {
    this.productService.getProductTypes().subscribe(result =>{
      this.productTypes = result;
      this.CheckExpirations();
      this.getData();
    });
  }

  getProductTypeNames() : string[] {
    if (!this.productTypes){
      return;
    }

    var names = [];

    for (let pType of this.productTypes){
        names.push(pType.name)
    }

    return names;
  }


  CheckExpirations() {
    var exp = 0;
    var expThisMonth = 0;
    var expNextMonth = 0;
    var expLater = 0;
    var thisMonth = new Date().getMonth()

    for (let product of this.products){
      if (new Date(product.endDate).getMonth() == thisMonth){
        expThisMonth++;
      }else if (new Date(product.endDate).getMonth() == thisMonth + 1){
        expNextMonth++;
      }else if (new Date(product.endDate).getMonth() == thisMonth - 1){
        exp++
      }else {
        expLater++
      }
    }
    this.expireThisMonth = expThisMonth;
    this.expireNextMonth = expNextMonth;
    this.expired = exp;
    this.expireLater = expLater;
  }

  getData(): any {
    var dataset = new Dataset(this.countProductsByType(),
    ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', 
    '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#000000'],
    ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', 
    '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff']);
    var pie = new PieData(this.getProductTypeNames(), dataset);
    this.data = pie;
  }

}
