import langTabActionType from "../actionType/langTabActionType";

function langTabReducer(state = {id: 1, lang: "en"}, action) {
    switch (action.type) {
        case langTabActionType.TOGGLE_ENGLISH:
            state = {
                id: 1,
                lang: "en"
            };
            return state
        case langTabActionType.TOGGLE_KHMER:
            state = state = {
                id: 2,
                lang: "km"
            };
            return state
        default: 
            return state
    }
}
export default langTabReducer;