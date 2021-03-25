import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Response } from 'src/app/models/response';
import { DataSource } from '@angular/cdk/collections';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products;
  productSub;

  constructor(private productServices: ProductsService) { }

  ngOnInit(): void {
    this.productSub = this.productServices.getProducts().subscribe(
      (reponse: Response) => {
        this.products = reponse.result;
      },
      (error) => {console.log(error)},
    )
  }



}
