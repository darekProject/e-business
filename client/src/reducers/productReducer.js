import {ADD_PRODUCT} from "../actions/type";

export default function (state = {}, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                product: action.payload
            };
        default:
            return state;
    }
}