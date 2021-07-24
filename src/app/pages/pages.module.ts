import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { StoreModule } from '@ngrx/store';
import { pageFeatureKey, pageReducer } from './page.reducer';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { PageEffects } from './page.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ArticlesModule,
    CategoriesModule,
    ProductsModule,
    HttpClientModule,
    StoreModule.forFeature(pageFeatureKey , pageReducer),
    EffectsModule.forFeature([PageEffects])
  ]
})
export class PagesModule { }
