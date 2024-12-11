import { adminLocalStorage } from "../../api/localService.js";
import { LOG_OUT_ADMIN, SET_INFO_ADMIN } from "../constant/admin.js";

// Initialize the state with data from localStorage (if available)
const initialState = {
  info: adminLocalStorage.get(), // Assuming this function retrieves stored admin info from localStorage
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INFO_ADMIN:
      // Store admin info when the SET_INFO_ADMIN action is dispatched
      return { ...state, info: action.payload };

    case LOG_OUT_ADMIN:
      // Clear admin info when the LOG_OUT_ADMIN action is dispatched
      return { ...state, info: null };

    default:
      return state;
  }
};

export default adminReducer;
