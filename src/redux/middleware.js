import {
  configureStore as configStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createPhoenixChannelMiddleware } from "@trixtateam/phoenix-to-redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./rootSaga";
import createReducer from "./reducers";

export default function configureStore(initialState = {}) {
  const reduxSagaMonitorOptions = {};
  // Makes redux connected to phoenix channels
  const phoenixChannelMiddleWare = createPhoenixChannelMiddleware();
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const middlewares = [sagaMiddleware, phoenixChannelMiddleWare];

  const enhancers = [];

  const store = configStore({
    reducer: createReducer(),
    middleware: [
      ...getDefaultMiddleware({
        thunk: false,
        immutableCheck: {
          ignore: ["socket", "channel", "trixta", "phoenix", "router"],
        },
        serializableCheck: false,
      }),
      ...middlewares,
    ],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== "production" ||
      process.env.PUBLIC_URL.length > 0,
    enhancers,
  });

  sagaMiddleware.run(rootSaga);

  return store;
}
