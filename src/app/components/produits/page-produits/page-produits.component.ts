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
import { DeleteProductModalComponent } from '../delete-product-modal/delete-product-modal.component';


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
      console.log(this.baseUrlImage);

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
              this.productRetour.idProduct = data.args.lastInsertId;
              if(this.file){
                // UPLOAD IMAGE
                this.fileService.uploadImage(this.file).subscribe(
                  (event: HttpEvent<any>) => {
                    this.uploadImage(event).then(
                      ()=>{
                         /*** maj IHM ***/
                         this.majIHM_add(this.productRetour)
                      }
                    )
                  }
                )
              } else {
                this.majIHM_add(this.productRetour)
              }

            }
            else{
              this.notificationService.warn("Erreur lors de l'ajout");
            }
          }
        )

      }
    }
    )
  }

  editProduct(leProduit: Product): void{
    let dialogRef = this.dialog.open(AddOrEditProductModalComponent, {
      width: '80%',
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
            console.log("modif",data);
            if(data.status == 200){
              if(this.file){
                // upload NEW image
                console.log("IMAAAAAGE UPLOAD");
                this.fileService.uploadImage(this.file).subscribe(
                  (event: HttpEvent<any>) => {
                      this.uploadImage(event).then(
                        ()=>{
                            this.majIHM_edit(this.productRetour)
                        }
                      )
                  }
                )
                // delete OLD image
                console.log(leProduit);
                this.fileService.deleteImage(leProduit.image).subscribe(
                  (data: Response) => {
                    console.log(data);
                  }
                )
              } else {
                this.majIHM_edit(this.productRetour)
              }


            }else{
              console.log(data.message);
            }
          }
        )
        this.notificationService.success('Modification effectuée avec succès');
      }
    }
    );
  }

  uploadImage(event){
        return new Promise(
          (resolve, reject) => {
            switch(event.type) {
              case HttpEventType.Sent:
                    console.log("requete envoyée avec succes");
                    break;
                  case HttpEventType.UploadProgress:
                    this.progress = Math.round(event.loaded / event.total * 100);
                    if(this.progress == 100){
                      resolve(true);
                    }
                    break;
                  case HttpEventType.Response:
                    console.log(event.body);
                    setTimeout(() => {
                      this.progress = 0
                    }, 1500);
                    break;
                }
              }
          )
        }


deleteProduct(leProduit: Product): void{
  let dialogRef = this.dialog.open(DeleteProductModalComponent, {
    width: '80%',
    data: leProduit
  });
  dialogRef.afterClosed().subscribe((retour) => {

  }
  );
}



        majIHM_add(product: Product){
          /*** maj IHM ***/
          this.products.push(product);
          this.dataSource.data = this.products;
          this.notificationService.success('Ajout effectué avec succès');
        }

        majIHM_edit(product: Product){
           //*** MAJ IHM ***/
           const index = this.products.findIndex(p => p.idProduct == product.idProduct)
           this.products[index] = product;
           this.dataSource.data = this.products;
        }



}
