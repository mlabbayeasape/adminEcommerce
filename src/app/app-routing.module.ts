import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrEditProductModalComponent } from './components/add-or-edit-product-modal/add-or-edit-product-modal.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'home',component: HomeComponent},
  {path:'products',component: AddOrEditProductModalComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
