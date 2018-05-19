import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import product from './productReducer';

const rootReducer = combineReducers({
    form,
    product: product
});

export default rootReducer;