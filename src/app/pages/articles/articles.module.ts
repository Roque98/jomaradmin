import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesPage } from './articles.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AccordionComponent } from './components/accordion/accordion.component';
import { ArticleOptionsComponent } from './components/article-options/article-options.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { articleFeatureKey, ArticleReducer } from './ngrx/articles.reducer';
import { ArticlesEffects } from './ngrx/articles.effects';



@NgModule({
  declarations: [
    ArticlesPage,
    AccordionComponent,
    ArticleOptionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(articleFeatureKey, ArticleReducer),
    EffectsModule.forFeature([ArticlesEffects]),
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ArticlesModule { }
