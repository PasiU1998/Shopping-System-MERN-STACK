import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING,GET_USER } from "./types";
import {getCartByUser} from "./cartActions";
import {createCart } from "./cartActions";

//  Wish list
import {createWishList} from "./wishlistActions";
import {getWishlistByUser} from "./wishlistActions"
// User Register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
        const newCart = {
            user_id: res.data._id,
            products: []
        };
        dispatch(createCart(newCart));

        const newWishlist = {
            user_id: res.data._id,
            products: []
        };
        dispatch(createWishList(newWishlist));
        history.push("/login");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login(get user token)
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch(getCartByUser(decoded.id));
      dispatch(getWishlistByUser(decoded.id));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//loading user
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log out
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

//update User
export const updateUser = (id,userData,history) => dispatch => {
    axios
        .put("/api/users/updateUser/" + id , {
            name:userData.name,
            firstName: userData.firstName,
            lastName: userData.lastName,
            address: userData.address,
            city: userData.city
        })
        .then(res => {
            history.push("/admin")
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//update Password
export const updatePassword = (id,userData,history) => dispatch => {
    axios
        .put("/api/users/updatePassword/" + id , {
            password:userData.password,
            password2: userData.passwordOne
        })
        .then(res => {
            history.push("/admin")
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

//Deactivate Account By the user
export const deactivateAccount = (id,history) => dispatch => {

    axios
        .delete("/api/users/deleteUser/" + id )
        .then(res => {
            localStorage.removeItem("jwtToken");
            setAuthToken(false);
            dispatch(setCurrentUser({}));
            //history.push("/login")
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const deleteUser = (id,history) => dispatch => {

    axios
        .delete("/api/users/deleteUser/" + id )
        .then(res => {
            // localStorage.removeItem("jwtToken");
            // setAuthToken(false);
            // dispatch(setCurrentUser({}));
            //history.push("/admin/storemanager/all")
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


// User Register
export const registerStoreManager = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => {
            //history.push("/admin/storemanager/all");
            return true
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};


