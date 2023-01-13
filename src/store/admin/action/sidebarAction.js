import sidebarActionType from "../actionType/sidebarActionType"

const toggleSidebarAction = () => {
    return {
        type: sidebarActionType.TOGGLE_SIDEBAR
    }
}

export {toggleSidebarAction}