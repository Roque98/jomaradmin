import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { CategoriesService } from '../categories.service';
import { categoriesActions } from './categories.actions';


@Injectable()
export class CategoriesEffects {

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.createCategory),
      exhaustMap((action) =>
        this.categoriesService.create(action.category).pipe(
          map((category) => categoriesActions.createCategorySuccess()),
          catchError((error) => of(categoriesActions.createCategoryError()))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.updateCategory),
      exhaustMap((action) =>
        this.categoriesService.update(action.id, action.changes).pipe(
          map((category) => categoriesActions.updateCategorySuccess()),
          catchError((error) => of(categoriesActions.updateCategoryError()))
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(categoriesActions.deleteCategory),
      exhaustMap((action) =>
        this.categoriesService.deleteOne(action.id).pipe(
          map((category) => categoriesActions.deleteCategorySuccess()),
          catchError((error) => of(categoriesActions.deleteCategoryError()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService
  ) {}
}
