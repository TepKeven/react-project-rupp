import langTabActionType from "../actionType/langTabActionType"

const toggleEnglishTabAction = () => {
    return {
        type: langTabActionType.TOGGLE_ENGLISH
    }
}

const toggleKhmerTabAction = () => {
    return {
        type: langTabActionType.TOGGLE_KHMER
    }
}

export {toggleEnglishTabAction, toggleKhmerTabAction}