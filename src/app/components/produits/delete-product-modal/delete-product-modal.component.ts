import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.css']
})
export class DeleteProductModalComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DeleteProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) { }

  ngOnInit(): void {
  }


  cancelDelete():void{

  }

  confirmDelete(): void{

  }

}
