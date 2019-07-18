import axios from "axios";
import { GET_BRANDS, ADD_BRAND, DELETE_BRAND, BRANDS_LOADING } from "./types";

export const getBrands = () => dispatch => {
  dispatch(setBrandsLaoding());
  axios.get("http://localhost:5000/api/brands").then(res =>
    dispatch({
      type: GET_BRANDS,
      payload: res.data
    })
  );
};

export const deleteBrand = id => {
  return {
    type: DELETE_BRAND,
    payload: id
  };
};

export const addBrand = brand => dispatch => {
  axios
    .post("http://localhost:5000/api/brands", brand)
    .then(res => dispatch({ type: ADD_BRAND, payload: res.data }));
};

export const setBrandsLaoding = () => {
  return {
    type: BRANDS_LOADING
  };
};
