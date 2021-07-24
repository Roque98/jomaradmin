import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { PagesService } from "../pages.service";
import { articlesActions } from "./articles/ngrx/articles.actions";
import { categoriesActions } from "./categories/ngrx/categories.actions";
import { pageActions } from "./page.actions";
import { productsActions } from "./products/ngrx/products.action";

@Injectable()
export class PageEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(pageActions.loadData),
      switchMap(() =>
        this.pageService
          .getData()
          .pipe(
            mergeMap(data => [
              pageActions.loadDataSuccess(),
              articlesActions.loadArticles({ articles: data.articles }),
              categoriesActions.loadCategories({ categories: data.categories}),
              productsActions.loadProduct({ products: data.products })
            ])
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private pageService: PagesService
  ) {}
}
