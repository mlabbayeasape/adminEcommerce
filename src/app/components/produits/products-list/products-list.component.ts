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

 // JE SUIS DANS LE COMPOSANT PARENT, J'AJOUTE UN PRODUIT !!!

 addProduct(): void{
    let dialogRef = this.dialog.open(AddOrEditProductModalComponent, {
      width: '800px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((retour: Product) => {
      if (retour) {
        //TEST AJOUT:
        this.notificationService.success('Ajout effectué'+JSON.stringify(retour));

        // TEST 1
        //J'insere une ligne dans mon tableau "products"
        this.products.unshift(retour);
        // résultat:  ma table ne se met pas à jour (sauf si je modifie le paginator)

        // TEST 2
        // Je modifie le libellé du premier élément de mon tableau "products"
        this.products[0].name = "Le libellé est modifié et visible dans la table"
        // résultat: le libéllé est bien mis a jour dans la table




        //******/
        // ICI COMMENT ACTUALISER MA TABLE POUR AFFICHER LE PRODUIT AJOUTé ?????
        //******/

        // HTTP PUSH
        // this.productService.addProduct(retour).subscribe(
        //   (data) => {
        //     if(data.status == 200){
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
