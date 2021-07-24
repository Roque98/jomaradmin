import { ArticlesState } from '../pages/articles/ngrx/articles.reducer';
import { CategoriesState } from '../pages/categories/ngrx/categories.reducer';
import { PageState } from '../pages/page.reducer';
import { ProductsState } from '../pages/products/ngrx/products.reducer';

export interface AppState {
  articlesFeature: ArticlesState,
  categoriesFeature: CategoriesState,
  productsFeature: ProductsState,
  pageFeauture: PageState
}
