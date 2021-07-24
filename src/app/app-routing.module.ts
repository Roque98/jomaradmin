import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArticlesPage } from './pages/articles/articles.page';
import { CategoriesPage } from './pages/categories/categories.page';
import { ProductsPage } from './pages/products/products.page';

const routes: Routes = [
  { path: 'articles',component: ArticlesPage },
  { path: 'categories/:articleId',component: CategoriesPage },
  { path: 'products/:categoryId',component: ProductsPage },
  { path: '**', redirectTo: 'articles'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
