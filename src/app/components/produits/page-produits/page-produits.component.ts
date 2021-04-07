import { AfterViewInit, Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AddOrEditProductModalComponent } from '../add-or-edit-product-modal/add-or-edit-product-modal.component';
import { Response } from 'src/app/models/response';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-page-produits',
  templateUrl: './page-produits.component.html',
  styleUrls: ['./page-produits.component.css']
})
export class PageProduitsComponent implements OnInit , AfterViewInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['idProduct','name','description','price','stock','star'];

  productRetour: Product;
  products;
  productsSub;

  constructor(private productServices: ProductsService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    ) { }

    ngOnInit(): void {


      }



      ngAfterViewInit() {
        this.productsSub = this.productServices.getProducts().subscribe(
          (response: Response)=>{
             this.products = response.result;
             this.dataSource = new MatTableDataSource(this.products);
             this.dataSource.paginator = this.paginator;
             this.productsSub.unsubscribe();
           },
           (error)=>{console.log(error)},
         )
      }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


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
        this.dataSource.data = this.products;
        // résultat:  ma table ne se met pas à jour (sauf si je modifie le paginator)

        // TEST 2
        // Je modifie le libellé du premier élément de mon tableau "products"
        //this.products[0].name = "Le libellé est modifié et visible dans la table"
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
