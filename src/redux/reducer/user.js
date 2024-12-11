import { userLocalStorage } from "../../api/localService.js";
import { CHOOSE_TRAILER, LOG_OUT, SET_INFO } from "../constant/user.js";

// Initial state, including info from localStorage and a chosenTrailer property
const initialState = {
  info: userLocalStorage.get(),
  chosenTrailer: "",
};

// Reducer function to handle different actions
const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INFO:
      // Update user info by replacing the current info with the payload
      return { ...state, info: payload };

    case LOG_OUT:
      // Reset user info to null (ensure immutability)
      return { ...state, info: null };

    case CHOOSE_TRAILER:
      // Update chosenTrailer with the provided payload
      return { ...state, chosenTrailer: payload };

    default:
      // Return the current state for any other action types
      return state;
  }
};

export default userReducer;
