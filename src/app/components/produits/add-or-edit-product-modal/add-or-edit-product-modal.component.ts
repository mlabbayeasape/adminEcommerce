import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-or-edit-product-modal',
  templateUrl: './add-or-edit-product-modal.component.html',
  styleUrls: ['./add-or-edit-product-modal.component.css']
})
export class AddOrEditProductModalComponent implements OnInit, OnDestroy {

  @Input() product: Product;
  productForm: FormGroup; // initialise un formulaire
  categories: Category[];
  categorySub: Subscription;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddOrEditProductModalComponent>, private categoriesService: CategoriesService) {
    this.productForm = fb.group({
      productInfos: fb.group({
        name: ['',Validators.required],
        descrition: ['',Validators.required],
        price: ['',Validators.required],
        stock: ['',Validators.required],
        category: ['',Validators.required],
      }),
      illustration: fb.group({
        image: ['',Validators.required]
      })
    })
  }

  ngOnInit(): void {
    this.categorySub = this.categoriesService.getCategory().subscribe(
      (reponse)=>{
        this.categories = reponse.result;
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(){
    this.categorySub.unsubscribe();
  }

  idCategory = null;
  selectCategory(id:number) {
    this.idCategory = id;
  }

}
