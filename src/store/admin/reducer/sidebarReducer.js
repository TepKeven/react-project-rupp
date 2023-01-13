import sidebarActionType from "../actionType/sidebarActionType";

function sidebarReducer(state = true, action) {
    switch (action.type) {
        case sidebarActionType.TOGGLE_SIDEBAR:
            state = !state;
            return state
        default: 
            return state
    }
}
export default sidebarReducer;