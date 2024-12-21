// reducers.js
import { ActionTypes } from './actions';

const initialState = {
  isLoggedIn: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true
      };
    case ActionTypes.SIGNUP:
      return {
        ...state,
        isLoggedIn: true
      };
    default:
      return state;
  }
};

export default rootReducer;
