// reducers/userReducer.js
import { SET_INFO, CHOOSE_TRAILER, SET_ERROR } from "../constant/user";

const initialState = {
  userInfo: null,
  error: null,
  trailer: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INFO:
      return {
        ...state,
        userInfo: action.payload,
        error: null, // Clear any previous errors
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload, // Store the error message
      };
    case CHOOSE_TRAILER:
      return {
        ...state,
        trailer: action.payload,
      };
    default:
      return state;
  }
};
