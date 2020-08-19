import {
  SET_RECIPES,
  LOADING_DATA,
  LOADING_UI,
  LIKE_RECIPE,
  UNLIKE_RECIPE,
  DELETE_RECIPE,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_RECIPE,
  SET_RECIPE,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

// GET ALL RECIPES
export const getRecipes = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/recipes')
    .then((res) => {
      dispatch({
        type: SET_RECIPES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_RECIPES,
        payload: [],
      });
    });
};

//  GET ONE RECIPE
export const getRecipe = (recipeId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/recipe/${recipeId}`)
    .then((res) => {
      dispatch({
        type: SET_RECIPE,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// POST A RECIPE
export const postRecipe = (newRecipe) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/recipe', newRecipe)
    .then((res) => {
      dispatch({
        type: POST_RECIPE,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// EDIT RECIPE
export const addRecipeDetails = (recipeDetails) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/recipe', recipeDetails)
    .then((res) => {
      dispatch({
        type: SET_RECIPE,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

// LIKE RECIPE
export const likeRecipe = (recipeId) => (dispatch) => {
  axios
    .get(`/recipe/${recipeId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_RECIPE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// UNLIKE RECIPE
export const unlikeRecipe = (recipeId) => (dispatch) => {
  axios
    .get(`/recipe/${recipeId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_RECIPE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// SUBMIT COMMENT
export const submitComment = (recipeId, commentData) => (dispatch) => {
  axios
    .post(`/recipe/${recipeId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// DELETE RECIPE
export const deleteRecipe = (recipeId) => (dispatch) => {
  axios
    .delete(`/recipe/${recipeId}`)
    .then(() => {
      dispatch({ type: DELETE_RECIPE, payload: recipeId });
    })
    .catch((err) => console.log(err));
};

// VIEW PROFILE
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_RECIPES,
        payload: res.data.recipes,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_RECIPES,
        payload: null,
      });
    });
};

// RECIPE IMAGES
export const addImageToRecipe = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/recipe', formData)
    .then((res) => {
      dispatch({
        type: SET_RECIPE,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
