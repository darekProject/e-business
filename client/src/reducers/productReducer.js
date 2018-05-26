import {
    ADD_PRODUCT,
    ADD_PRODUCT_TO_SHOPPING_CARTS,
    FILTER_PRODUCTS_BY_CATEGORY,
    FILTER_PRODUCTS_BY_KEYWORDS,
    GET_PRODUCT, GET_PRODUCTS_OF_CART
} from "../actions/type";

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                product: action.payload
            };
        case ADD_PRODUCT_TO_SHOPPING_CARTS:
            return {
                ...state,
                productAddedToShoppingCarts: action.payload
            };
        case GET_PRODUCT:
            return {
                ...state,
                allProducts: action.payload
            };
        case GET_PRODUCTS_OF_CART: {
            return {
                ...state,
                productsOfCart: action.payload
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
        default:
            return state;
    }
}