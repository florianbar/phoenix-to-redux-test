import _ from 'lodash';
import { put, select, takeLatest } from 'redux-saga/effects';
import {
  connectPhoenix
  getPhoenixChannel,
  pushToPhoenixChannel,
} from '@trixtateam/phoenix-to-redux';

import { routePaths } from '../../route-paths';
import {
  REQUEST_LOGIN,
  REQUEST_LOGIN_FAILURE,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_TIMEOUT,
} from './constants';

/**
 *
 * @param data
 * @returns {IterableIterator<IterableIterator<*>|void|*>}
 */
export function* loginSaga({ data }) {
  try {
    // show loading indicator
    yield put(loggingIn());
    const channelTopic = 'authentication';
    // get the login domain data passed from the requestAuthentication action
    const domain = _.get(data, 'domain', '');
    // get the anonymous channel and socket
    yield put(connectPhoenix({ domainUrl: domain }))
    yield put(
      getPhoenixChannel({
        domainUrl: domain,
        channelTopic,
      })
    );
    // push the data to 'authentication' channel topic
    // domain will be available on the response because its passed as additionalData
    // on OK response from channel dispatch REQUEST_LOGIN_SUCCESS
    // on error response from channel dispatch REQUEST_LOGIN_FAILURE
     // on timeout response from channel dispatch REQUEST_LOGIN_TIMEOUT
    yield put(
    pushToPhoenixChannel({
      channelTopic,
      eventName: authenticationEvents.LOGIN,
      channelResponseEvent: REQUEST_LOGIN_SUCCESS,
      channelErrorResponseEvent: REQUEST_LOGIN_FAILURE,
      requestData: data,
      additionalData: { domainUrl },
      dispatchChannelError: true,
      customerTimeoutEvent: REQUEST_LOGIN_TIMEOUT,
    });
  } catch (error) {
    yield put(loginFailed(error));
    yield put(updateError({ error: error.toString() }));
  }
}