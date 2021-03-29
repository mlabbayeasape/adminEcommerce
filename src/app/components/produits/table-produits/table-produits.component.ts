import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatTableDataSource } from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-table-produits',
  templateUrl: './table-produits.component.html',
  styleUrls: ['./table-produits.component.css']
})


export class TableProduitsComponent implements OnInit {
  @Input() products: Product[];
  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['idProduct','name','description','price','stock'];
  constructor() {
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

}


