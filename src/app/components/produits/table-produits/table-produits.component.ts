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
<<<<<<< HEAD


  @Input() lesProduits: Product[];

=======
  @Input('products') products: Product[];
>>>>>>> 7709b86f16452a20f10e5ec7b4aecf4838bc459b
  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['idProduct'];
  constructor() {
<<<<<<< HEAD
    console.log(this.lesProduits);
    this.dataSource = new MatTableDataSource(this.lesProduits);

    console.log(this.dataSource.data);
=======
>>>>>>> 7709b86f16452a20f10e5ec7b4aecf4838bc459b
  }

  ngOnInit(): void {
    console.log(this.products);
    this.dataSource = new MatTableDataSource(this.products);
  }
}


