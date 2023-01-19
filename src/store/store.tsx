import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './auth/authReducer';
import { dialogoReducer } from './dialogo/dialogoReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { productosReducer } from './productos/productosReducer';
import { saveState } from './saveState';
import { setError } from './setError';

export const reducers = combineReducers({
  auth: authReducer,
  productos: productosReducer,
  dialogo: dialogoReducer
});

declare const window: any;
const environment = import.meta.env.VITE_ENVIRONMENT;

const composeEnhancers = environment === 'production'
  ? compose
  : (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(saveState),
  applyMiddleware(setError),
  // other store enhancers if any
);

export const store = createStore(
  reducers,
  enhancer
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
