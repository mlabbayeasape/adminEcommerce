import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';
import {DataSource} from '@angular/cdk/collections';
import { Product } from 'src/app/models/product';
import { Response } from 'src/app/models/response';
import { MatTableDataSource } from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-table-produits',
  templateUrl: './table-produits.component.html',
  styleUrls: ['./table-produits.component.css']
})


export class TableProduitsComponent implements OnInit {
  @Input('products') products: Product[];
  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['idProduct'];
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.products);
    this.dataSource = new MatTableDataSource(this.products);
  }
}


