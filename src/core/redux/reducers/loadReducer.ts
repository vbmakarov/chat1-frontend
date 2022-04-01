import { ActionLoadingTypes, LoadTypeAction } from '../actions/types/loadTypes'

const initialState = false

const loadReducer = (state = initialState, action: ActionLoadingTypes) => {
    switch (action.type) {
        case LoadTypeAction.LOADING_START: return true
        case LoadTypeAction.LOADING_FINISH: return false
        default: return state
    }
}

export default loadReducer