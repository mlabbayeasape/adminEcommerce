import { Component, Input, OnInit } from '@angular/core';
import { Response } from 'src/app/models/response';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})


export class ProductsListComponent implements OnInit {

  constructor(private productServices: ProductsService) { }

  products;
  productsSub;

  ngOnInit(): void {
    this.productsSub = this.productServices.getProducts().subscribe(
      (response: Response)=>{
        this.products = response.result;
      },
      (error)=>{console.log(error)},
    )
  }

}
