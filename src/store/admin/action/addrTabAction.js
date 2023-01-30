import addrTabActionType from "../actionType/addrTabActionType"

const toggleAddressTabAction = (data) => {
    return {
        type: addrTabActionType.TOGGLE_ADDRESS_TAB,
        payload: data
    }
}


export {toggleAddressTabAction}