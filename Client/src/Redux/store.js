import { legacy_createStore as createStore } from "redux";
import authentictedReducer from "./reducer";
const store = createStore(authentictedReducer);

export default store;