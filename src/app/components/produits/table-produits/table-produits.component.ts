import { Component, Input, OnInit, AfterViewInit, ViewChild, SimpleChanges, SimpleChange } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatTableDataSource } from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditProductModalComponent } from '../add-or-edit-product-modal/add-or-edit-product-modal.component';
import { NotificationService } from 'src/app/services/notification.service';
import { last } from 'rxjs/operators';


@Component({
  selector: 'app-table-produits',
  templateUrl: './table-produits.component.html',
  styleUrls: ['./table-produits.component.scss']
})

//toto
export class TableProduitsComponent implements OnInit {
  @Input() products: Product[];

  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['idProduct','name','description','price','stock','star'];
  constructor(public dialog: MatDialog,
    private notificationService: NotificationService) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.products);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   for (let property in changes) {
  //       if (property == 'products') {
  //         console.log('Current:', changes[property].currentValue);
  //       }
  //   }
  // }

  onRafraichit(){
    console.log("on refresh");
  }

  onDelete(leProduit: Product): void {

  }

  editProduct(leProduit: Product): void{
    let dialogRef = this.dialog.open(AddOrEditProductModalComponent, {
      width: '800px',
      data: leProduit
    });
    dialogRef.afterClosed().subscribe((retour) => {
      if (retour) {
        //MODIF
        console.log(JSON.stringify(retour))
        this.notificationService.success('Modification effectuée'+JSON.stringify(retour));
      } else {
        this.notificationService.success('Modification annulée');
      }
    }
    )
  }

}


