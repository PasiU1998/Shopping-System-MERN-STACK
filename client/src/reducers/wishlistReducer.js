import {
    GET_WISHLIST,
    CREATE_WISHLIST,
    UPDATE_WISHLIST,
    DELETE_WISHLIST,
    GET_WISHLIST_ERRORS,
} from "../actions/types";


const initialState = {
    wishlist: {},
    loading: false
};

export default function(state = initialState, action) {

    switch (action.type) {
        case GET_WISHLIST:
            return {
                ...state,
                wishlist: action.wishlist_data
            };

        case CREATE_WISHLIST:
            return {
                ...state,
                loading: true,
                wishlist: action.wishlist_data
            };

        case UPDATE_WISHLIST:
            return {
                ...state,
                loading: true,
                wishlist: action.wishlist_data
            };

        case DELETE_WISHLIST:
            return {
                ...state,
                wishlist: action.wishlist_data
            };
        case GET_WISHLIST_ERRORS:
            return {
                ...state,
                wishlist: action.wishlist_data
            };

        default:
            return state;
    }
}
