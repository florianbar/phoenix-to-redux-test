import { put, select, takeLatest } from "redux-saga/effects";

import { routePaths } from "../../route-paths";
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_FAILURE,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_TIMEOUT,
} from "./constants";
import { loginSaga } from "./loginSaga2";
import { handleLoginSuccessSaga } from "./handleLoginSuccessSaga";
import { handleLoginFailureSaga } from "./handleLoginFailureSaga";

export default function* loginPageSaga() {
  // listen for REQUEST_LOGIN action
  yield takeLatest(REQUEST_LOGIN, loginSaga);

  // listen for REQUEST_LOGIN_SUCCESS action
  yield takeLatest(REQUEST_LOGIN_SUCCESS, handleLoginSuccessSaga);

  // listen for REQUEST_LOGIN_FAILURE action
  yield takeLatest(REQUEST_LOGIN_FAILURE, handleLoginFailureSaga);
}
