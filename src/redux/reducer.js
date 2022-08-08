import { combineReducers } from "redux";
import { phoenixReducer } from "@trixtateam/phoenix-to-redux";

/**
 * Combine all reducers in this file and export the combined reducers.
 */
export default function createReducer() {
  const rootReducer = combineReducers({
    phoenix: phoenixReducer,
  });
  return rootReducer;
}
