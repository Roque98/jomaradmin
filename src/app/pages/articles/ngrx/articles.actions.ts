import { createAction, props } from "@ngrx/store";
import { Article } from "src/app/core/interfaces/article.interface";

// Create
export const createArticle = createAction(
  '[Articles page] create article',
  props<{ article: Article }>()
)

export const createArticleSuccess = createAction(
  '[Articles page] create article success',
)

export const createArticleError = createAction(
  '[Articles page] create article error',
)



// find all
export const loadArticles = createAction(
  '[Articles page] load articles',
  props<{ articles: Article[] }>()
)



// update
export const updateArticle = createAction(
  '[Articles page] update article',
  props<{id: string, changes: Partial<Article>}>()
)

export const updateArticleSuccess = createAction(
  '[Articles page] update article success'
)


export const updateArticleError = createAction(
  '[Articles page] update article error'
)

// Delete
export const deleteArticle = createAction(
  '[Articles page] delete article',
  props<{id: string}>()
)

export const deleteArticleSuccess = createAction(
  '[Articles page] delete article success'
)


export const deleteArticleError = createAction(
  '[Articles page] delete article error'
)

export const articlesActions = {
  createArticle,
  createArticleSuccess,
  createArticleError,
  loadArticles,
  updateArticle,
  updateArticleSuccess,
  updateArticleError,
  deleteArticle,
  deleteArticleSuccess,
  deleteArticleError,
}