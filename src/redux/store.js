import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { routerReducer } from 'react-router-redux';

import rootSaga from './sagas';

const configureStore = history => {
  const reducers = combineReducers({
    router: routerReducer,
  });

  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, routerMiddleware(history)];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
