import { createReducer, on } from '@ngrx/store';
import { Article } from 'src/app/core/interfaces/article.interface';
import { articlesActions } from './articles.actions';

export const articleFeatureKey = 'articlesFeature';

export interface ArticlesState {
  articles: Article[];
}

export const articleInitialState: ArticlesState = {
  articles: [],
};

const _articlesReducer = createReducer(
  articleInitialState,
  // create
  on(articlesActions.createArticle, (state, { article }) => {
    const newArticles = [...state.articles];

    newArticles.push(article);

    return {
      ...state,
      articles: newArticles,
    };
  }),
  // load
  on(articlesActions.loadArticles, (state, { articles }) => {
    return {
      ...state,
      articles
    };
  }),
  // update
  on(articlesActions.updateArticle, (state, { id, changes }) => {

    const newArticles = state.articles.map((article) => {
      if (article._id === id) {
        article = {
          ...article,
          ...changes,
        }
      }
      return article;
    });

    return {
      ...state,
      articles: newArticles,
    };
  }),
  // Delete
  on(articlesActions.deleteArticle, (state, { id }) => {
    // const newArticles = state.articles.filter((article) => {
    //   return article._id !== id
    // })

    const newArticles = state.articles.map(article => {
      let newArticle = article;
      if(newArticle._id === id){
        newArticle.removed = true;
      }
      return newArticle;
    })
    
    return {
      ...state,
      articles: newArticles
    }
  })
);

export function ArticleReducer(state: any, action: any) {
  return _articlesReducer(state, action);
}
