import axios from 'axios';
import {ADD_PRODUCT, ADD_PRODUCT_TO_SHOPPING_CARTS, FAILED_PRODUCT} from "./type";

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

export const addProductToShoppingCart = idProduct => dispatch => {

    const arrayProductInShoppingCart = [];
    const productInShoppingCart = JSON.parse(localStorage.getItem('productInShoppingCart'));

    if (productInShoppingCart) {
        arrayProductInShoppingCart.push(...productInShoppingCart, idProduct);
    } else {
        arrayProductInShoppingCart.push(idProduct);
    }

    localStorage.setItem('productInShoppingCart', JSON.stringify(arrayProductInShoppingCart));

    const payload = {idProduct, timestamp: Date.now()};
    dispatch({type: ADD_PRODUCT_TO_SHOPPING_CARTS, payload});
};