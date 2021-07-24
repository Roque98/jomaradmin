import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { productsActions } from './products.action';



@Injectable()
export class ProductsEffects {

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.createProduct),
      exhaustMap((action) =>
        this.productsService.create(action.product).pipe(
          map((product) => productsActions.createProductSuccess()),
          catchError((error) => of(productsActions.createProductError()))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.updateProduct),
      exhaustMap((action) =>
        this.productsService.update(action.id, action.changes).pipe(
          map((product) => productsActions.updateProductSuccess()),
          catchError((error) => of(productsActions.updateProductError()))
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.deleteProduct),
      exhaustMap((action) =>
        this.productsService.deleteOne(action.id).pipe(
          map((product) => productsActions.deleteProductSuccess()),
          catchError((error) => of(productsActions.deleteProductError()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}
}
