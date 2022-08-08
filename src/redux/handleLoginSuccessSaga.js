import _ from "lodash";
import { put, select } from "redux-saga/effects";
import { connectPhoenix } from "@trixtateam/phoenix-to-redux";

import { routePaths } from "../../route-paths";
import { makeSelectRouteLocation } from "../App/selectors";
import { updateError, defaultLoad, loginFailed } from "../App/actions";
import {
  PHOENIX_TOKEN,
  PHOENIX_SOCKET_DOMAIN,
  PHOENIX_AGENT_ID,
} from "../../config";

/**
 *
 * @param data
 * @returns {IterableIterator<*>}
 */
export function* handleLoginSuccessSaga({ data }) {
  // on success of login take the response data
  if (data) {
    // eslint-disable-next-line camelcase
    // additionalData you passed
    const domainUrl = _.get(data, "domainUrl");
    const agentId = _.get(data, "agent_id", "");
    const identity = _.get(data, "identity", "");
    const token = _.get(data, "jwt", "");

    // eslint-disable-next-line camelcase
    // update phoenix storage keys for future phoenix socket channel calls
    setLocalStorageItem(PHOENIX_SOCKET_DOMAIN, domainUrl);
    setLocalStorageItem(PHOENIX_TOKEN, token);
    setLocalStorageItem(PHOENIX_AGENT_ID, agentId);

    // connect authenticated phoenix socket
    yield put(connectPhoenix({ domainUrl, params: { agentId, token } }));
    yield put(push("/home"));
  } else {
    yield put(loginFailed());
  }
}
