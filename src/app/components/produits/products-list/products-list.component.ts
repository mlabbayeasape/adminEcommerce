import { Component, Input, OnInit } from '@angular/core';
import { Response } from 'src/app/models/response';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditProductModalComponent } from '../add-or-edit-product-modal/add-or-edit-product-modal.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})





export class ProductsListComponent implements OnInit {

  constructor(private productServices: ProductsService,
    public dialog: MatDialog,
    private notificationService: NotificationService) {  }

  productRetour: Product;

  //productRetour: Product = <Product>{}
  products;
  productsSub;
  productModalOpen: boolean = false;

  ngOnInit(): void {

    this.productsSub = this.productServices.getProducts().subscribe(
      (response: Response)=>{
        this.products = response.result;
        console.log(this.products)
      },
      (error)=>{console.log(error)},
    )
  }

  addProduct(): void{
    let dialogRef = this.dialog.open(AddOrEditProductModalComponent, {
      width: '800px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((retour) => {
      if (retour) {
        //AJOUT
        this.notificationService.success('Ajout effectué'+JSON.stringify(retour));
        console.log(JSON.stringify(retour));
      } else {
        this.notificationService.warn('Ajout annulé');
      }
    }
    )
  }

  editProduct(leProduit: Product): void{
    let dialogRef = this.dialog.open(AddOrEditProductModalComponent, {
      width: '800px',
      data: leProduit
    });
    dialogRef.afterClosed().subscribe((retour) => {
      if (retour) {
        //MODIF
        this.notificationService.success(':: Modification effectuée');
        console.log(JSON.stringify(retour));
      } else {
        console.log("annulé")
      }
    }
    )
  }

}
