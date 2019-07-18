import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  USERS_LOADING
} from "../actions/types";

const initialState = {
  user: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return { ...state, user: action.payload, loading: !state.loading };
    case DELETE_USER:
      return {
        ...state,
        user: state.users.filter(user => user.id !== action.payload)
      };
    case ADD_USER:
      return { ...state, user: [action.payload, ...state.user] };
    case USERS_LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
}
