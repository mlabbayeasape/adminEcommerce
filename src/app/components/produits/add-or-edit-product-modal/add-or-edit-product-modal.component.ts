import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-or-edit-product-modal',
  templateUrl: './add-or-edit-product-modal.component.html',
  styleUrls: ['./add-or-edit-product-modal.component.css']
})
export class AddOrEditProductModalComponent implements OnInit {

  @Input() product: Product;
  productForm: FormGroup; // initialise un formulaire

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddOrEditProductModalComponent>) {
    this.productForm = fb.group({
      productInfos: fb.group({
        name: ['',Validators.required],
        descrition: ['',Validators.required],
        price: ['',Validators.required],
        stock: ['',Validators.required]
      }),
      illustration: fb.group({
        image: ['',Validators.required]
      })
    })
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
