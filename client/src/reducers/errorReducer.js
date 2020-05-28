import { GET_ERRORS, GET_CART_ERRORS, GET_WISHLIST_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case GET_CART_ERRORS:
      return action.data;
    case GET_WISHLIST_ERRORS:
      return action.wishlist_data;
    default:
      return state;
  }
}
