import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Response } from 'src/app/models/response';
import { BreakpointObserver,LayoutModule,MediaMatcher  } from '@angular/cdk/layout';
import { Product } from '../../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  products: Product[];
  productSub;
  isSmallScreen = false

  constructor(private productServices: ProductsService, public breakpointObserver: BreakpointObserver) { }


  ngOnInit(): void {
    this.isSmallScreen = this.breakpointObserver.isMatched('(min-height: 40rem)')

    this.productSub = this.productServices.getProducts().subscribe(
      (reponse: Response) => {
        this.products = reponse.result;
      },
      (error) => {console.log(error)},
    )
  }

}
