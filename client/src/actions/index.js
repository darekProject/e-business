import axios from 'axios';
import {ADD_PRODUCT, ADD_PRODUCT_TO_SHOPPING_CARTS, FAILED_PRODUCT, GET_PRODUCT} from "./type";

const ROOT_URL = 'http://localhost:5050';

const MOCK_PRODUCTS = [
    {
        id: 1,
        title: "Asus Zenfone 2",
        imgUrl: 'asus_zenfone_5.jpg',
        cost: '350$',
        freeDelivery: false
    },
    {
        id: 2,
        title: "Asus Zenfone 5",
        imgUrl: 'asus_zenfone_5.jpg',
        cost: '1200$',
        freeDelivery: true
    },
    {
        id: 3,
        title: "Asus Zenfone 1",
        imgUrl: 'asus_zenfone_5.jpg',
        cost: '450$',
        freeDelivery: false
    },
    {
        id: 4,
        title: "Samsung Galaxy 3",
        imgUrl: 'asus_zenfone_5.jpg',
        cost: '1450$',
        freeDelivery: true
    },
    {
        id: 5,
        title: "Asus Zenfone 1",
        imgUrl: 'asus_zenfone_5.jpg',
        cost: '450$',
        freeDelivery: false
    },
    {
        id: 5,
        title: "Asus Zenfone 1",
        imgUrl: 'asus_zenfone_5.jpg',
        cost: '4450$',
        freeDelivery: true
    },
];


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

export const getProducts = () => async dispatch => {
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