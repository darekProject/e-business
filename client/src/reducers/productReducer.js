import {ADD_PRODUCT, ADD_PRODUCT_TO_SHOPPING_CARTS, GET_PRODUCT} from "../actions/type";

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
        default:
            return state;
    }
}