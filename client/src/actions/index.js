import axios from 'axios';
import {
    ADD_PRODUCT,
    ADD_PRODUCT_TO_SHOPPING_CARTS,
    FAILED_PRODUCT,
    FILTER_PRODUCTS_BY_CATEGORY,
    FILTER_PRODUCTS_BY_KEYWORDS,
    GET_PRODUCT
} from "./type";
import {MOCK_PRODUCTS} from './Mocks/mock_product';

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

export const getProducts = () => dispatch => {
    try {
        // const products = axios.get(`${ROOT_URL}/getProduct}`);
        //
        // products.map(product => {
        //     product.cost > 1000 ? product.freeDelivery = true : product.freeDelivery = false;
        // });

        dispatch({type: GET_PRODUCT, payload: MOCK_PRODUCTS})
    } catch (e) {
        dispatch(failedProduct('Error! Something was wrong during load products!'))
    }
};

export const filterProductsByCategory = category => dispatch => {
    dispatch({type: FILTER_PRODUCTS_BY_CATEGORY, payload: category});
};

export const filterProductsByKeyWords = keywords => dispatch => {
    dispatch({type: FILTER_PRODUCTS_BY_KEYWORDS, payload: keywords});
};