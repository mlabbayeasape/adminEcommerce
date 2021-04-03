import { Component, Input, OnInit } from '@angular/core';
import { Response } from 'src/app/models/response';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditProductModalComponent } from '../add-or-edit-product-modal/add-or-edit-product-modal.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})





export class ProductsListComponent implements OnInit {

  constructor(private productServices: ProductsService, public dialog: MatDialog) {  }

  productRetour: Product;

  //productRetour: Product = <Product>{}
  products;
  productsSub;
  productModalOpen: boolean = false;

  ngOnInit(): void {

    this.productsSub = this.productServices.getProducts().subscribe(
      (response: Response)=>{
        this.products = response.result;
      },
      (error)=>{console.log(error)},
    )
  }

  addProduct(): void{

    let dialogRef = this.dialog.open(AddOrEditProductModalComponent, {
      width: '800px',
      data: this.products[2]

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed ');
       this.productRetour = result;
       console.log(result);
    });
  }

}
