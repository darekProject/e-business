import {ADD_PRODUCT, ADD_PRODUCT_TO_SHOPPING_CARTS} from "../actions/type";

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
        default:
            return state;
    }
}