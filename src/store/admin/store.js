import { createStore } from "redux";
import AllReducers from "./reducer";


var storeAdmin = createStore(AllReducers);

export default storeAdmin;