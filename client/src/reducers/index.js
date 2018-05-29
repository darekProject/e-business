import {combineReducers} from 'redux';
import {reducer as form} from 'redux-form';
import product from './productReducer';
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    form,
    product: product,
    user: authReducer
});

export default rootReducer;