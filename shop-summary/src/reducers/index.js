import {combineReducers} from 'redux';
import promoCodeReducers from './promoCodeReducers';

export default combineReducers({
    promoCode: promoCodeReducers
});