import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { AddOrEditProductModalComponent } from '../add-or-edit-product-modal/add-or-edit-product-modal.component';
import { Response } from 'src/app/models/response';
import { ProductsService } from 'src/app/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-page-produits',
  templateUrl: './page-produits.component.html',
  styleUrls: ['./page-produits.component.scss']
})
export class PageProduitsComponent implements OnInit , AfterViewInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['idProduct','name','description','price','stock','star'];

  productRetour: Product;
  products;
  productsSub;
  file: File;

  constructor(private productServices: ProductsService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private fileService: FileUploadService,
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
        //this.products.unshift(retour);
       // this.dataSource.data = this.products;


        // HTTP PUSH
        this.productServices.addProduct(retour).subscribe(
          (data) => {
            if(data.status == 200){
              //this.fileService.uploadImage()
              retour.idProduct = data.args.lastInsertId
              this.products.unshift(retour);
              this.dataSource.data = this.products;
            }
          }
        )

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

        this.notificationService.success('Modification effectuée'+JSON.stringify(retour));
      } else {
        this.notificationService.success('Modification annulée');
      }
    }
    );
  }

}
