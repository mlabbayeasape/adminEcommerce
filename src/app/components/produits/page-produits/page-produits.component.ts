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
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-page-produits',
  templateUrl: './page-produits.component.html',
  styleUrls: ['./page-produits.component.scss']
})
export class PageProduitsComponent implements OnInit , AfterViewInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['idProduct','name','description','price','stock','image','star'];

  productRetour: Product;
  products;
  productsSub;
  file: File;
  progress = 0;
  baseUrlImage = `${environment.api_image}`;


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
             console.log(this.products)
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
    dialogRef.afterClosed().subscribe((retour) => {
      if (retour) {


        this.productRetour = retour.product;
        console.log(this.productRetour)
        this.file = retour.file;

        // HTTP PUSH
        this.productServices.addProduct(this.productRetour).subscribe(
          (data) => {
            console.log(data);
            if(data.status == 200){
              if(this.file){
                // UPLOAD IMAGE
                this.fileService.uploadImage(this.file).subscribe(
                  (event: HttpEvent<any>) => {
                      this.uploadImage(event)
                  }
                )
              }
              this.productRetour.idProduct = data.args.lastInsertId
              this.products.push(this.productRetour);
              this.dataSource.data = this.products;
              this.notificationService.success('Ajout effectué'+JSON.stringify(retour));
            }
            else{
              this.notificationService.warn("Erreur lors de l'ajout");
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
        this.productRetour = retour.product;
        this.productRetour.idProduct = leProduit.idProduct;
        this.file = retour.file;
        // EDIT SERVEUR
        this.productServices.editProduct(this.productRetour).subscribe(
          (data: Response) => {
            if(data.status == 200){
              if(this.file){
                // UPLOAD IMAGE
                this.fileService.uploadImage(this.file).subscribe(
                  (event: HttpEvent<any>) => {
                      this.uploadImage(event)
                  }
                )
                this.fileService.deleteImage(leProduit.image).subscribe(
                  (data: Response) => {
                    console.log(data);
                  }
                ) // on supprime l'ancienne image
              }

              const index = this.products.findIndex(p => p.idProduct == leProduit.idProduct)
              this.products[index] = this.productRetour;
              // this.products = [
              //   ...this.products.slice(0,index),
              //   this.productRetour,
              //   ...this.products.slice(index+1)

              // ]
            }else{
              console.log(data.message);
            }
          }
        )
        console.log(this.productRetour);
        this.notificationService.success('Modification effectuée'+JSON.stringify(retour));
      } else {
        this.notificationService.success('Modification annulée');
      }
    }
    );
  }

  uploadImage(event){
          switch(event.type) {
                  case HttpEventType.Sent:
                        console.log("requete envoyée avec succes");
                        break;
                      case HttpEventType.UploadProgress:
                        this.progress = Math.round(event.loaded / event.total * 100)
                        break;
                      case HttpEventType.Response:
                        console.log(event.body);
                        setTimeout(() => {
                          this.progress = 0
                        }, 1500);
                        break;
                    }
                  }


}
