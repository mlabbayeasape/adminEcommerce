import { NgModule,Component, ViewChild, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';
import { AddOrEditProductModalComponent } from './components/add-or-edit-product-modal/add-or-edit-product-modal.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableProductsComponent } from './components/home/table-products/table-products.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DeleteProductModalComponent,
    AddOrEditProductModalComponent,
    NavigationComponent,
    TableProductsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
