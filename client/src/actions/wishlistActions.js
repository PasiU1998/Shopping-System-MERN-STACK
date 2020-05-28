import axios from "axios";

import { GET_WISHLIST, CREATE_WISHLIST, UPDATE_WISHLIST, DELETE_WISHLIST, GET_WISHLIST_ERRORS } from "./types";

// Get Cart By User
export const getWishlistByUser = (id, history) => dispatch => {
    axios
        .get("/api/wishlists/user/"+id)
        .then(res =>
            dispatch({
                type: GET_WISHLIST,
                wishlist_data: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_WISHLIST_ERRORS,
                wishlist_data: err
            })
        );
};

// Create Cart
export const createWishList = (wishlistData, history) => dispatch => {
    axios
        .post("/api/wishlists/add", wishlistData)
        .then(res =>
            dispatch({
                type: CREATE_WISHLIST,
                wishlist_data: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_WISHLIST_ERRORS,
                wishlist_data: err
            })
        );
};

//update Cart
export const updateWishList = (id, wishListData, history) => dispatch => {
    axios
        .put("/api/wishlists/update/" + id , wishListData)
        .then(res => {
            dispatch({
                type: UPDATE_WISHLIST,
                wishlist_data: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_WISHLIST_ERRORS,
                wishlist_data: err
            })
        );
};

//Delete Cart
export const deleteWishList = (id, history) => dispatch => {

    axios
        .delete("/api/wishlists/delete/" + id )
        .then(res => {
            dispatch({
                type: DELETE_WISHLIST,
                wishlist_data: ""
            })
        })
        .catch(err =>
            dispatch({
                type: GET_WISHLIST_ERRORS,
                wishlist_data: err
            })
        );
};


