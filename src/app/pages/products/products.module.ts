import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPage } from './products.page';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductOptionsComponent } from './components/product-options/product-options.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { productsFeatureKey, ProductsReducer } from './ngrx/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './ngrx/products.effects';



@NgModule({
  declarations: [
    ProductsPage,
    ProductOptionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature(productsFeatureKey, ProductsReducer),
    EffectsModule.forFeature([ProductsEffects])
  ]
})
export class ProductsModule { }
