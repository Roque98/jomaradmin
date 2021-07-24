import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { ArticlesService } from '../articles.service';
import { articlesActions } from './articles.actions';

@Injectable()
export class ArticlesEffects {

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articlesActions.createArticle),
      exhaustMap((action) =>
        this.articlesService.create(action.article).pipe(
          map((article) => articlesActions.createArticleSuccess()),
          catchError((error) => of(articlesActions.createArticleError()))
        )
      )
    )
  );

  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articlesActions.updateArticle),
      exhaustMap((action) =>
        this.articlesService.update(action.id, action.changes).pipe(
          map((article) => articlesActions.updateArticleSuccess()),
          catchError((error) => of(articlesActions.updateArticleError()))
        )
      )
    )
  );

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articlesActions.deleteArticle),
      exhaustMap((action) =>
        this.articlesService.deleteOne(action.id).pipe(
          map((article) => articlesActions.deleteArticleSuccess()),
          catchError((error) => of(articlesActions.deleteArticleError()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private articlesService: ArticlesService
  ) {}
}
