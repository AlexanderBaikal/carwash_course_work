import { createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import modalMiddleware from "../middlewares/modalMiddleware";
import rootReducer from "./reducers/rootReducer";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, modalMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
