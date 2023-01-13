import { combineReducers } from "redux";
import sidebarReducer from "./sidebarReducer";


const AllReducers = combineReducers({
    showSidebar: sidebarReducer
})

export default AllReducers;