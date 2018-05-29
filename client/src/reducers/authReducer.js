import {AUTH_USER, USER_ADDED, AUTH_ERROR, UNAUTH_USER} from '../actions/type';

export default function (state = {}, action) {
    switch (action.type) {
        case USER_ADDED:
            return {
                ...state,
                userAdded: true
            };
        case AUTH_USER:
            return {
                ...state,
                authenticated: true,
                authUser: action.payload || null
            };
        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case UNAUTH_USER:
            return {
                ...state,
                authenticated: false
            };
        default:
            return state;
    }
};