import { createReducer, on } from '@ngrx/store';
import { Category } from 'src/app/core/interfaces/category.interface';
import { categoriesActions } from './categories.actions';

export const categoriesFeatureKey = 'categoriesFeature';

export interface CategoriesState {
  categories: Category[];
}

export const categoriesInitialState: CategoriesState = {
  categories: []
};

const _categoriesReducer = createReducer(
  categoriesInitialState,

  // create
  on(categoriesActions.createCategory, (state, { category }) => {
    const newCategories = [...state.categories];

    newCategories.push(category);

    return {
      ...state,
      categories: newCategories,
    };
  }),

  // find all
  on(categoriesActions.loadCategories, (state,{categories}) => {
    return {
      ...state,
      categories
    };
  }),
  // update
  on(categoriesActions.updateCategory, (state, { id, changes }) => {

    
    const newCategories = state.categories.map((category) => {
      if (category._id === id) {
        category = {
          ...category,
          ...changes,
        }
      }
      return category;
    });

    

    return {
      ...state,
      categories: newCategories,
    };
  }),
  // Delete
  on(categoriesActions.deleteCategory, (state, { id }) => {
    const newArticles = state.categories.filter((category) => {
      return category._id !== id
    })

    
    return {
      ...state,
      articles: newArticles
    }
  })
);

export function CategoriesReducer(state: any, action: any) {
  return _categoriesReducer(state, action);
}
