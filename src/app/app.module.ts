import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AddOrEditProductModalComponent } from './components/produits/add-or-edit-product-modal/add-or-edit-product-modal.component';
import { DeleteProductModalComponent } from './components/produits/delete-product-modal/delete-product-modal.component';
import { ProductsListComponent} from './components/produits/products-list/products-list.component'



import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { TableProduitsComponent } from './components/produits/table-produits/table-produits.component';
import {MatDialogModule} from '@angular/material/dialog';

import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';

import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { PageProduitsComponent } from './components/produits/page-produits/page-produits.component';
import {MatRippleModule} from '@angular/material/core';
import { MajProductComponent } from './components/produits/maj-product/maj-product.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeleteProductModalComponent,
    AddOrEditProductModalComponent,
    NavigationComponent,
    ProductsListComponent,
    TableProduitsComponent,
    PageProduitsComponent,
    MajProductComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatStepperModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRadioModule,
    MatSnackBarModule,
    MatRippleModule,
    MatTabsModule,

  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
