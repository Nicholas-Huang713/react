import counterReducer from './counter';
import loggedReducer from './isLogged';
import addName from './addName';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    addName: addName
})

export default allReducers;

