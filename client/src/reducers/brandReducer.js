import {
  GET_BRANDS,
  ADD_BRAND,
  DELETE_BRAND,
  BRANDS_LOADING
} from "../actions/types";

const initialState = {
  brand: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BRANDS:
      return { ...state, brand: action.payload, loading: !state.loading };
    case DELETE_BRAND:
      return {
        ...state,
        brand: state.brand.filter(brand => brand.id !== action.payload)
      };
    case ADD_BRAND:
      return { ...state, brand: [...state.brand, action.payload] };
    case BRANDS_LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
}
