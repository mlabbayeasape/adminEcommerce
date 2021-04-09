import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.scss']
})
export class DeleteProductModalComponent implements OnInit {
  baseUrlImage = `${environment.api_image}`;
  constructor( public dialogRef: MatDialogRef<DeleteProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) { }

  ngOnInit(): void {
  }


  cancelDelete():void{
      this.dialogRef.close();
  }

  confirmDelete(): void{
    const confirmation: Boolean = true;
    this.dialogRef.close({confirmation})
  }

}
