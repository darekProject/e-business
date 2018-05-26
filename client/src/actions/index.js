import axios from 'axios';
import {
    ADD_PRODUCT,
    ADD_PRODUCT_TO_SHOPPING_CARTS,
    FAILED_PRODUCT,
    FILTER_PRODUCTS_BY_CATEGORY,
    FILTER_PRODUCTS_BY_KEYWORDS,
    GET_PRODUCT,
    GET_PRODUCTS_OF_CART, REMOVE_PRODUCT_TO_SHOPPING_CARTS
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

export const removeProductOfShoppingCart = (idProduct, force = false) => dispatch => {
    const productInShoppingCart = JSON.parse(localStorage.getItem('productInShoppingCart'));

    if (productInShoppingCart) {
        const cartIndex = productInShoppingCart.findIndex(prod => prod === idProduct);
        if (force) {
            const amountProductInCart = productInShoppingCart.filter(prod => prod === idProduct);
            for (let i = 0; i < amountProductInCart.length; i++) {
                const cartIndex = productInShoppingCart.findIndex(prod => prod === idProduct);
                productInShoppingCart.splice(cartIndex, 1);
            }
        } else {
            productInShoppingCart.splice(cartIndex, 1);
        }
    }

    localStorage.setItem('productInShoppingCart', JSON.stringify(productInShoppingCart));

    const payload = {idProduct, timestamp: Date.now()};
    dispatch({type: REMOVE_PRODUCT_TO_SHOPPING_CARTS, payload});
};

export const getProducts = () => dispatch => {
    try {
        // const products = axios.get(`${ROOT_URL}/getProduct}`);
        //
        // products.map(product => {
        //     product.cost > 1000 ? product.freeDelivery = true : product.freeDelivery = false;
        // });
        const products = [];

        MOCK_PRODUCTS.map(prod => {
            products.push(prod);
        });

        dispatch({type: GET_PRODUCT, payload: products})
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

export const getProductsOfCart = () => dispatch => {
    try {
        const productsInShoppingCart = JSON.parse(localStorage.getItem('productInShoppingCart'));
        const products = [];

        productsInShoppingCart.map(prodId => {
            const mocIndex = MOCK_PRODUCTS.findIndex(el => el.id === prodId);
            products.push(MOCK_PRODUCTS[mocIndex]);
        });

        dispatch({type: GET_PRODUCTS_OF_CART, payload: products});
    } catch (e) {
        console.warn(e);
    }
};