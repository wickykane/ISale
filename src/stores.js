import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';
import initReducer from './reducers';
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();
export default function initStore(initialState, history) {
    const middlewares = [thunk, sagaMiddleware, routerMiddleware(history)];
    const enhancers = [applyMiddleware(...middlewares)];

    const composeEnhancers = (process.env.NODE_ENV !== 'production') && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ shouldhotreload: false }) :
        compose;
    let store = createStore(initReducer(), fromJS(initialState), composeEnhancers(...enhancers));

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry
    return store;
}