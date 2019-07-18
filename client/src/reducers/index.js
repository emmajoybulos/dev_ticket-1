import { combineReducers } from "redux";

import userReducer from "./userReducer";
import brandReducer from "./brandReducer";

export default combineReducers({
  user: userReducer,
  brand: brandReducer
});
