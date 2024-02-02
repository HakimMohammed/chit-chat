import { combineReducers } from "redux";

const authenticatedReducer = (state = "", action) => {
  switch (action.type) {
    case "login":
      return action.payload;
    case "logout":
      return "";
    default:
      return state;
  }
};

const presenceReducer = (state = [], action) => {
  switch (action.type) {
    case "subscribed":
      return [...new Set([])];
    case "added":
      const userExists = state.some((user) => user.id === action.payload.id);
      if (!userExists) {
        return [...state, action.payload];
      } else {
        return state;
      }
    // case "added":
    //   return [...state, action.payload];
    case "removed":
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};

const reducer = combineReducers({
  presence: presenceReducer,
  authenticated: authenticatedReducer,
});

export default presenceReducer;
