import axios from "axios";

import { GET_CART_ERRORS, GET_CART, CREATE_CART, UPDATE_CART, DELETE_CART } from "./types";

// Get Cart By User
export const getCartByUser = (id, history) => dispatch => {
    axios
        .get("/api/carts/user/get/"+id)
        .then(res =>
            dispatch({
                type: GET_CART,
                data: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_CART_ERRORS,
                data: err
            })
        );
};

// Create Cart
export const createCart = (cartData, history) => dispatch => {
    axios
        .post("/api/carts/store", cartData)
        .then(res =>
            dispatch({
                type: CREATE_CART,
                data: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_CART_ERRORS,
                data: err
            })
        );
};

//update Cart
export const updateCart = (id, cartData, history) => dispatch => {
    axios
        .put("/api/carts/update/" + id , cartData)
        .then(res => {
            dispatch({
                type: UPDATE_CART,
                data: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_CART_ERRORS,
                data: err
            })
        );
};

//Delete Cart
export const deleteCart = (id, history) => dispatch => {

    axios
        .delete("/api/carts/delete/" + id )
        .then(res => {
            dispatch({
                type: DELETE_CART,
                data: ""
            })
        })
        .catch(err =>
            dispatch({
                type: GET_CART_ERRORS,
                data: err
            })
        );
};


