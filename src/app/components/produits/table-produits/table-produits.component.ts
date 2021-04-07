import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditProductModalComponent } from '../add-or-edit-product-modal/add-or-edit-product-modal.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-table-produits',
  templateUrl: './table-produits.component.html',
  styleUrls: ['./table-produits.component.scss']
})


export class TableProduitsComponent implements OnInit, OnChanges {
  private _products: Product[];

  @Input() set products(value) {
    this._products = value;
    this.refresh();
  }

  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['idProduct','name','description','price','stock','star'];

  constructor(
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.dataSource = new MatTableDataSource(this._products);
    this.changeDetectorRefs.detectChanges();
    this.changeDetectorRefs.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refresh();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
        this._products.push(retour);
        this.notificationService.success('Modification effectuée'+JSON.stringify(retour));
        this.refresh();
      } else {
        this.notificationService.success('Modification annulée');
      }
    }
    );
  }

}


