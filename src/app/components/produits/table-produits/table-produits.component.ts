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

// export class TableProduitsComponent implements AfterViewInit, OnInit {
//   @Input() products: Product[];
//   displayedColumns: string[] = ['idProduct', 'name', 'price'];
//   dataSource = new MatTableDataSource<Product>([]);

//   @ViewChild(MatPaginator) paginator: MatPaginator;

// ngOnInit(){
//    this.dataSource = new MatTableDataSource<Product>(this.products);
//    this.dataSource.data = this.products;
// }

//   ngAfterViewInit() {


//     this.dataSource.paginator = this.paginator;
//   }

// }

export class TableProduitsComponent implements OnInit {
  @Input() products: Product[];

  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['idProduct', 'name', 'description', 'price'];
  constructor() {
    console.log(this.products);
    this.dataSource = new MatTableDataSource(this.products);
    console.log(this.dataSource.data);
  }

  ngOnInit(): void {

     console.log(this.dataSource.data);
  }
}


