import {
    ADD_PRODUCT,
    ADD_PRODUCT_TO_SHOPPING_CARTS,
    REMOVE_PRODUCT_TO_SHOPPING_CARTS,
    FILTER_PRODUCTS_BY_CATEGORY,
    FILTER_PRODUCTS_BY_KEYWORDS,
    GET_PRODUCTS, GET_PRODUCTS_OF_CART,
    GET_PRODUCT, ADD_PRODUCTS_TO_SHOPPING_CARTS, GET_COMMENTS
} from "../actions/type";

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                status: action.payload
            };
        case ADD_PRODUCT_TO_SHOPPING_CARTS:
            return {
                ...state,
                productAddedToShoppingCarts: action.payload
            };
        case ADD_PRODUCTS_TO_SHOPPING_CARTS:
            return {
                ...state,
                productAddedToShoppingCarts: action.payload
            };
        case REMOVE_PRODUCT_TO_SHOPPING_CARTS:
            return {
                ...state,
                productAddedToShoppingCarts: action.payload
            };
        case GET_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload
            };
        case GET_PRODUCTS_OF_CART: {
            return {
                ...state,
                productsOfCart: action.payload,
                productAddedToShoppingCarts: action.payload
            }
        }
        case FILTER_PRODUCTS_BY_CATEGORY: {
            const newState = Object.assign({}, state);
            newState.sortByKeyWords = null;

            return {
                ...newState,
                sortByCategory: action.payload
            };
        }
        case FILTER_PRODUCTS_BY_KEYWORDS: {
            const newState = Object.assign({}, state);
            newState.sortByCategory = null;

            return {
                ...newState,
                sortByKeyWords: action.payload
            };
        }
        case GET_COMMENTS: {
            return {
                ...state,
                comments: action.payload
            }
        }
        default:
            return state;
    }
}