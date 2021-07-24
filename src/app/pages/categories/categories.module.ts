import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesPage } from './categories.page';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryOptionsComponent } from './components/category-options/category-options.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { categoriesFeatureKey, CategoriesReducer } from './ngrx/categories.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CategoriesEffects } from './ngrx/categories.effects';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CategoriesPage,
    CategoryOptionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(categoriesFeatureKey, CategoriesReducer),
    EffectsModule.forFeature([CategoriesEffects])
  ]
})
export class CategoriesModule { }
