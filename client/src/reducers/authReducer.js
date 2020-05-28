import { SET_CURRENT_USER, USER_LOADING,GET_USER } from "../actions/types";


const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  userRole: "",
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        userRole: action.payload.userRole,
        user: action.payload
      };


    case USER_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
