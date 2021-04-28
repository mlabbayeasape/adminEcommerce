import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrEditProductModalComponent } from './components/produits/add-or-edit-product-modal/add-or-edit-product-modal.component';
import { ProductsListComponent } from './components/produits/products-list/products-list.component';
import { HomeComponent } from './components/home/home.component';
import { PageProduitsComponent } from './components/produits/page-produits/page-produits.component';
import { FicheProduitComponent } from './components/produits/fiche-produit/fiche-produit.component';

const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'products',component: AddOrEditProductModalComponent},
  {path:'productsList',component: ProductsListComponent},
  {path:'page-produits',component: PageProduitsComponent},
  {path:'fiche-produit/:id',component: FicheProduitComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
