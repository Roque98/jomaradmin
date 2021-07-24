import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/core/interfaces/product.interface';
import { productsActions } from './products.action';


export const productsFeatureKey = 'productsFeature';

export interface ProductsState {
  products: Product[];
}

export const productsInitialState: ProductsState = {
  products: []
};

const _productsReducer = createReducer(
  productsInitialState,

  // create
  on(productsActions.createProduct, (state, { product }) => {
    const newProducts = [...state.products];

    newProducts.push(product);

    return {
      ...state,
      products: newProducts,
    };
  }),

  // find all
  on(productsActions.loadProduct, (state,{products}) => {
    return {
      ...state,
      products
    };
  }),


  // update
  on(productsActions.updateProduct, (state, { id, changes }) => {

    
    const newProducts = state.products.map((product) => {
      if (product._id === id) {
        product = {
          ...product,
          ...changes,
        }
      }
      return product;
    });

    

    return {
      ...state,
      products: newProducts,
    };
  }),


  // Delete
  on(productsActions.deleteProduct, (state, { id }) => {
    const newProducts = state.products.filter((category) => {
      return category._id !== id
    })

    return {
      ...state,
      products: newProducts
    }
  })
);

export function ProductsReducer(state: any, action: any) {
  return _productsReducer(state, action);
}
