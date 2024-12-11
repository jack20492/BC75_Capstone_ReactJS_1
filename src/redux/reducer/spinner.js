import { SET_LOADING_OFF, SET_LOADING_ON } from "../constant/spinner";

// Initial state with default value for loading state
const initialState = {
  isLoading: false,
};

const spinnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_OFF:
      // Set isLoading to false when the loading off action is triggered
      return { ...state, isLoading: false };

    case SET_LOADING_ON:
      // Set isLoading to true when the loading on action is triggered
      return { ...state, isLoading: true };

    default:
      return state; // Return the current state for any other action type
  }
};

export default spinnerReducer;
