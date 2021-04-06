import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Response } from 'src/app/models/response';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditProductModalComponent } from '../add-or-edit-product-modal/add-or-edit-product-modal.component';
import { NotificationService } from 'src/app/services/notification.service';
import { TableProduitsComponent } from '../table-produits/table-produits.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})


export class ProductsListComponent implements OnInit {


  @ViewChild(TableProduitsComponent, { static: true })
  fils: TableProduitsComponent;

  constructor(private productServices: ProductsService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private productService: ProductsService) {  }

  productRetour: Product;

  //productRetour: Product = <Product>{}
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
  // ngAfterViewInit(): void {
  //   console.log("lesproduitsdufils:"+this.fils.dataSource); // affiche premier
  //   }


  addProduct(): void{
    let dialogRef = this.dialog.open(AddOrEditProductModalComponent, {
      width: '800px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((retour: Product) => {
      if (retour) {
        //AJOUT
        this.notificationService.success('Ajout effectué'+JSON.stringify(retour));
        console.log(JSON.stringify(retour));
        this.products.push(retour);
        this.fils.onRafraichit();
        // this.productService.addProduct(retour).subscribe(
        //   (data) => {
        //     if(data.status == 200){
        //       retour.idProduct = data.args.lastInsertId;

        //       //this.fils.products = this.products;

        //     }
        //   }
        // )
      } else {
        this.notificationService.warn('Ajout annulé');
      }
    }
    )
  }

}
