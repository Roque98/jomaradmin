import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/core/interfaces/product.interface";

// Create
export const createProduct = createAction(
  '[Products page] create product',
  props<{ product: Product }>()
)

export const createProductSuccess = createAction(
  '[Products page] create product success',
)

export const createProductError = createAction(
  '[Products page] create product error',
)



// load
export const loadProduct = createAction(
  '[Products page] load product',
  props<{products: Product[]}>()
)



// update
export const updateProduct = createAction(
  '[Products page] update product',
  props<{id: string, changes: Partial<Product>}>()
)

export const updateProductSuccess = createAction(
  '[Products page] update product success'
)


export const updateProductError = createAction(
  '[Products page] update product error'
)

// Delete
export const deleteProduct = createAction(
  '[Products page] delete product',
  props<{id: string}>()
)

export const deleteProductSuccess = createAction(
  '[Products page] delete product success'
)


export const deleteProductError = createAction(
  '[Products page] delete product error'
)

// Export

export const productsActions = {
  createProduct,
  createProductSuccess,
  createProductError,
  loadProduct,
  updateProduct,
  updateProductSuccess,
  updateProductError,
  deleteProduct,
  deleteProductSuccess,
  deleteProductError
}