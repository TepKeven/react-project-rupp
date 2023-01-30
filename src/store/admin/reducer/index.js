import { combineReducers } from "redux";
import addrTabReducer from "./addrTabReducer";
import langTabReducer from "./langTabReducer";
import sidebarReducer from "./sidebarReducer";


const AllReducers = combineReducers({
    showSidebar: sidebarReducer,
    getLangTab: langTabReducer,
    getAddrTab: addrTabReducer
})

export default AllReducers;