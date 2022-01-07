import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/AuthReducers';
import { RoomsReducers } from '../reducers/RoomsReducers';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth : authReducer,
    room : RoomsReducers
});



export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)