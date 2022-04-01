import { ActionDialogTypes, DialogTypeAction } from '../actions/types/dialogTypes'
import { AxiosDialogResponseData } from '../../models/DialogModel'
import { Dialog } from '@mui/material'

type TState = {
    loading: boolean,
    currentDialog: AxiosDialogResponseData | null,
    dialogs: AxiosDialogResponseData[]
}

const initialState: TState = {
    loading: false,
    currentDialog: {} as AxiosDialogResponseData,
    dialogs: []
}

const dialogsReducer = (state = initialState, action: ActionDialogTypes): typeof initialState => {
    switch (action.type) {
        case DialogTypeAction.FETCH_DIALOGS: return {
            ...state,
            currentDialog: null,
            dialogs: [...action.payload]
        }
        case DialogTypeAction.CREATE_DIALOG: return {
            ...state,
            currentDialog: state.currentDialog,
            dialogs: [...state.dialogs, action.payload]
        }
        case DialogTypeAction.CURRENT_DIALOG: return {
            ...state,
            currentDialog: action.payload,
            dialogs: state.dialogs,
        }
        case DialogTypeAction.UNSET_CURRENT_DIALOG: return {
            ...state,
            currentDialog: action.payload,
            dialogs: state.dialogs,
        }
        case DialogTypeAction.REMOVE_DIALOG: return {
            ...state,
            dialogs: state.dialogs.filter((dialog, _) => dialog._id !== action.payload)
        }
        case DialogTypeAction.START_LOADING: return {
            ...state,
            loading: action.payload
        }
        case DialogTypeAction.STOP_LOADING: return {
            ...state,
            loading: action.payload
        }
        default: return state
    }
}

export default dialogsReducer