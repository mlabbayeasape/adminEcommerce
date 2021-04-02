import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-add-or-edit-product-modal',
  templateUrl: './add-or-edit-product-modal.component.html',
  styleUrls: ['./add-or-edit-product-modal.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AddOrEditProductModalComponent implements OnInit, OnDestroy {

  @Input() product: Product;
  productForm: FormGroup; // initialise un formulaire
  categories: Category[];
  categorySub: Subscription;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddOrEditProductModalComponent>, private categoriesService: CategoriesService) {
    this.productForm = fb.group({
      // productCategory: fb.group({
      //   category: [0,Validators.required],
      // }),
      productInfos: fb.group({
        name: ['',Validators.required],
        descrition: ['',Validators.required],
        price: ['',Validators.required],
        stock: ['',Validators.required],
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
  selectedCategory: number = null;
  selectCategory(id: number) {
    this.idCategory = id;
    this.selectedCategory = id;
    // this.productForm.controls.productCategory.get('category').setValue(id);
    // console.log(this.productForm.controls.productCategory.get('category').value);
  }
  selectCategory2(id: string) {
    //this.productForm.controls.productCategory.get('category').setValue(id);

     console.log("1 - "+this.productForm.controls.productCategory.valid);
     console.log("2 - "+this.productForm.controls.productInfos.valid);
     console.log("3 - "+this.productForm.controls.illustration.valid);

  }



  //** controle des formulaires **/
  get isCategoryInvalid(): boolean {  // le get devant sert a dire qu'on peut utiliser la fonction comme attribut
    return this.productForm.get('productCategory').invalid;
  }
  get isProductInfosInvalid(): boolean {  // le get devant sert a dire qu'on peut utiliser la fonction comme attribut
    return this.productForm.get('productInfos').invalid;
  }
  get isIllustrationInvalid(): boolean {
    return this.productForm.get('illustration').invalid;
  }

}
