import _ from "lodash";
import { put } from "redux-saga/effects";
import {
  disconnectPhoenix,
  updatePhoenixLoginDetails,
  getAnonymousPhoenixChannel,
  pushToPhoenixChannel,
} from "@trixtateam/phoenix-to-redux";

import { updateError, defaultLoad } from "../App/actions";

export function* handleLoginFailureSaga(error) {
  yield put(
    updateError({
      error: _.get(error.data, "reason", "Authentication Failed"),
    })
  );
  yield put(defaultLoad());
}
