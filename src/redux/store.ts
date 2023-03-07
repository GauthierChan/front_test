import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import cartReducer from "./session/cart.reducer";

const reducers = combineReducers({
    cartReducer: cartReducer
});


const middlewares = [];
middlewares.push(thunk)
if(process.env.NODE_ENV === 'development'){
    middlewares.push(logger)
}


export type RootState = ReturnType<typeof reducers>;


export const store = createStore(reducers, {}, applyMiddleware(...middlewares));