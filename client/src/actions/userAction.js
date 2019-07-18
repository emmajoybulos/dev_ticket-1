import axios from "axios";
import { GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING } from "./types";

export const getUsers = () => dispatch => {
  dispatch(setUsersLoading());
  axios.get("http://localhost:5000/api/users").then(res =>
    dispatch({
      type: GET_USERS,
      payload: res.data
    })
  );
};

export const deleteUser = id => {
  return {
    type: DELETE_USER,
    payload: id
  };
};

export const addUser = user => {
  return {
    type: ADD_USER,
    payload: user
  };
};

export const setUsersLoading = () => {
  return {
    type: USERS_LOADING
  };
};
