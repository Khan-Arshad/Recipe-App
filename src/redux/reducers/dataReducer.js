import {
  SET_RECIPES,
  LOADING_DATA,
  LIKE_RECIPE,
  UNLIKE_RECIPE,
  DELETE_RECIPE,
  POST_RECIPE,
  SET_RECIPE,
  SUBMIT_COMMENT,
} from '../types';

const initialState = {
  recipes: [],
  recipe: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
      };
    case SET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };
    case LIKE_RECIPE:
    case UNLIKE_RECIPE:
      let index = state.recipes.findIndex(
        (recipe) => recipe.recipeId === action.payload.recipeId
      );
      state.recipes[index] = action.payload;
      if (state.recipe.recipeId === action.payload.recipeId) {
        state.recipe = { ...state.recipe, ...action.payload };
      }
      return {
        ...state,
      };
    case DELETE_RECIPE:
      index = state.recipes.findIndex(
        (recipe) => recipe.recipeId === action.payload
      );
      state.recipes.splice(index, 1);
      return {
        ...state,
      };
    case POST_RECIPE:
      return {
        ...state,
        recipes: [action.payload, ...state.recipes],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        recipe: {
          ...state.recipe,
          comments: [action.payload, ...state.recipe.comments],
        },
      };
    default:
      return state;
  }
}
