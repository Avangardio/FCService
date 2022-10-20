import { createStore, Store, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/allReducers";
import {DispatchType, ReduxStoreType, ActionType} from "./types/reduxStoreTypes"

const store: Store<ReduxStoreType, ActionType> & {dispatch: DispatchType} = createStore(rootReducer);


export default store;
