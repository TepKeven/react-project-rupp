import addrTabActionType from "../actionType/addrTabActionType";

function addrTabReducer(state = "#customer_address_0", action) {
    switch (action.type) {
        case addrTabActionType.TOGGLE_ADDRESS_TAB:
            state = action.payload
            return state
        default: 
            return state
    }
}
export default addrTabReducer;