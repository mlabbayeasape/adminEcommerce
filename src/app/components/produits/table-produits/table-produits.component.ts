import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatTableDataSource } from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditProductModalComponent } from '../add-or-edit-product-modal/add-or-edit-product-modal.component';


@Component({
  selector: 'app-table-produits',
  templateUrl: './table-produits.component.html',
  styleUrls: ['./table-produits.component.scss']
})

//toto
export class TableProduitsComponent implements OnInit {
  @Input() products: Product[];
  productModalOpen: boolean = false;
  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['idProduct','name','description','price','stock','star'];
  constructor(public dialog: MatDialog) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    console.log(this.products);
    this.dataSource = new MatTableDataSource(this.products);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(product: Product): void{
    this.productModalOpen = true;
  }

  onDelete(product: Product): void {

  }

  addProduct(): void{
    let dialogRef = this.dialog.open(AddOrEditProductModalComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }



}


