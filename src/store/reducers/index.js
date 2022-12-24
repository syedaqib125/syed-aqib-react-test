import { combineReducers } from "redux";

import authReducer from "./authReducer";
import callReducer from "./callReducer";

export default combineReducers({
  authReducer,
  callReducer,
});
