import axios from 'axios';
import {
    ADD_PRODUCT,
    ADD_PRODUCT_TO_SHOPPING_CARTS,
    FAILED_PRODUCT,
    FILTER_PRODUCTS_BY_CATEGORY,
    FILTER_PRODUCTS_BY_KEYWORDS,
    GET_PRODUCTS, GET_PRODUCT,
    GET_PRODUCTS_OF_CART, REMOVE_PRODUCT_TO_SHOPPING_CARTS,
    ADD_PRODUCTS_TO_SHOPPING_CARTS, GET_COMMENTS
} from "./type";
import {MOCK_PRODUCTS} from './Mocks/mock_product';
import {MOCK_COMMENTS} from './Mocks/mock_comments';

const ROOT_URL = 'http://localhost:9090';

export const addProduct = (values) => async dispatch => {
    try {
        values.id = 1;
        const response = await axios.post(`/addproduct`, values);

        dispatch({type: ADD_PRODUCT, payload: response})
    } catch (e) {
        console.error(e);
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

export const addProductsToShoppingCart = (idProduct, quantity) => dispatch => {
    const productInShoppingCart = JSON.parse(localStorage.getItem('productInShoppingCart'));

    for (let i = 0; i < quantity; i++) {
        productInShoppingCart.push(idProduct);
    }

    localStorage.setItem('productInShoppingCart', JSON.stringify(productInShoppingCart));

    const payload = {idProduct, timestamp: Date.now()};
    dispatch({type: ADD_PRODUCTS_TO_SHOPPING_CARTS, payload});
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

export const getProducts = () => async dispatch => {
    try {
        const {data: products} = await axios.get(`/products`);

        products.map(product => {
            let {prize, name} = product;
            product.cost = prize;
            product.title = name;
            prize = parseInt(prize.substring(0, prize.length - 1));
            prize > 1000 ? product.freeDelivery = true : product.freeDelivery = false;
        });

        dispatch({type: GET_PRODUCTS, payload: products})
    } catch (e) {
        dispatch(failedProduct('Error! Something was wrong during load products!'))
    }
};

export const getProduct = id => async dispatch => {
    try {
        const {data: product} = await axios.get(`/product/${id}`);
        const rightProduct = product[0];
        rightProduct.cost = product[0].prize;
        dispatch({type: GET_PRODUCT, payload: rightProduct});
    } catch (e) {
        console.error(e);
    }
};

export const filterProductsByCategory = category => dispatch => {
    dispatch({type: FILTER_PRODUCTS_BY_CATEGORY, payload: category});
};

export const filterProductsByKeyWords = keywords => dispatch => {
    dispatch({type: FILTER_PRODUCTS_BY_KEYWORDS, payload: keywords});
};

export const getProductsOfCart = () => async dispatch => {
    try {
        const productsInShoppingCart = JSON.parse(localStorage.getItem('productInShoppingCart'));
        const products = [];

        if (productsInShoppingCart) {
            for (let prodId of productsInShoppingCart) {
                const {data: product} = await axios.get(`/product/${prodId}`);
                const rightProduct = product[0];
                rightProduct.title = product[0].name;
                rightProduct.cost = product[0].prize;

                products.push(rightProduct);
            }
        }

        dispatch({type: GET_PRODUCTS_OF_CART, payload: products});
    } catch (e) {
        console.warn(e);
    }
};

export const getComments = id => async dispatch => {
    try {
        const {data: comments} = await axios.get(`/comments/${id}`);

        dispatch({type: GET_COMMENTS, payload: comments})
    } catch (e) {
        console.error(e)
    }
};

export const addCommentToProduct = ({userName, comment}, id) => async dispatch => {
    try {
        const comment = {
            id,
            content: comment,
            userName,
            prodId: id
        };

        const response = await axios.post(`/addcomment`, comment);
        console.log(response);
    } catch (e) {
        console.error(e)
    }
};