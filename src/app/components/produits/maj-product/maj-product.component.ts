import { Component, Input, OnDestroy, OnInit, Output,EventEmitter ,Inject, ViewChild, OnChanges} from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-maj-product',
  templateUrl: './maj-product.component.html',
  styleUrls: ['./maj-product.component.css']
})
export class MajProductComponent implements OnInit {


  @ViewChild('fileInput')
  fileInput;
  file: File | null = null;

  oldImage: string;

  productForm: FormGroup; // initialise un formulaire
  categories: Category[];
  categorySub: Subscription;
  selectedCategory: number;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<MajProductComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: Product) {
    this.productForm = fb.group({
      productCategory: fb.group({
        Category: [this.data.Category,Validators.required],
      }),
      productInfos: fb.group({
        name: [this.data.name,Validators.required],
        description: [this.data.description,Validators.required],
        price: [this.data.price,Validators.required],
        stock: [this.data.stock,Validators.required],
      }),
      illustration: fb.group({
        image: [this.data.image,Validators.required]
      })
    })

  }

  ngOnInit(): void {
    this.categorySub = this.categoriesService.getCategory().subscribe(
      (reponse)=>{
        this.categories = reponse.result;
      }
    )
    this.selectCategory(this.data.Category);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(){
    this.categorySub.unsubscribe();
  }


  selectCategory(id: number) {
    this.selectedCategory = id;
    this.productForm.get('productCategory').get('Category').setValue(id);
  }

  //** controle des formulaires **/
  get isCategoryInvalid(): boolean {  // le get devant sert a dire qu'on peut utiliser la fonction comme attribut
    return this.productForm.get('productCategory').invalid;
  }
  get isProductInfosInvalid(): boolean {  // le get devant sert a dire qu'on peut utiliser la fonction comme attribut
    return this.productForm.get('productInfos').invalid;
  }
  get isIllustrationInvalid(): boolean {
    if(this.data){
      return false;
    }
    return this.productForm.get('illustration').invalid;
  }

  close(){
    this.productForm.reset();
    //this.idCategory = null;
  }

  handleCancel(){
    // this.finish.emit();
    this.dialogRef.close();

  }

  handleFinish(){
    const product = {
      ...this.productForm.get('productCategory').value,
      ...this.productForm.get('productInfos').value,
      ...this.productForm.get('illustration').value
    }
    const leFile: File = this.file;

    if(this.file){
      product.image = this.file.name
    }

    //this.dialogRef.close(product);

    this.dialogRef.close({product:product,file:leFile})
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(event): void {
    this.file = event.target.files[0];
  }


}
