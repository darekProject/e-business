import axios from 'axios';
import {ADD_PRODUCT, FAILED_PRODUCT} from "./type";

const ROOT_URL = 'http://localhost:5050';

export const addProduct = (values) => async dispatch => {
    try {
        values.id = 1;
        const response = axios.post(`${ROOT_URL}/addProduct`, values);

        dispatch({type: ADD_PRODUCT, payload: response})

    } catch (e) {
        dispatch(failedProduct('Error! Something was wrong!'))
    }
};

const failedProduct = (error) => {
    return {
        type: FAILED_PRODUCT,
        payload: error
    }
};