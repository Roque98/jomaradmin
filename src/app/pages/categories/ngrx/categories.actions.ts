import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/core/interfaces/category.interface";

// Create
export const createCategory = createAction(
  '[Categories page] create Category',
  props<{ category: Category }>()
)

export const createCategorySuccess = createAction(
  '[Categories page] create Category success',
)

export const createCategoryError = createAction(
  '[Categories page] create Category error',
)



// load
export const loadCategories = createAction(
  '[Categories page] load Categories',
  props<{categories: Category[]}>()
)



// update
export const updateCategory = createAction(
  '[Categories page] update Category',
  props<{id: string, changes: Partial<Category>}>()
)

export const updateCategorySuccess = createAction(
  '[Categories page] update Category success'
)


export const updateCategoryError = createAction(
  '[Categories page] update Category error'
)

// Delete
export const deleteCategory = createAction(
  '[Categories page] delete Category',
  props<{id: string}>()
)

export const deleteCategorySuccess = createAction(
  '[Categories page] delete Category success'
)


export const deleteCategoryError = createAction(
  '[Categories page] delete Category error'
)

export const categoriesActions = {
  createCategory,
  createCategorySuccess,
  createCategoryError,
  loadCategories,
  updateCategory,
  updateCategorySuccess,
  updateCategoryError,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryError,
}