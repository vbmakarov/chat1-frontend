import {
    DialogTypeAction,
    IDialogsCreateAction,
    IDialogsFetchAction,
    IDialogsSetCurrentAction,
    IDialogsUnSetCurrentAction,
    IDialogsRemoveAction,
    IDialogsStartLoadAction,
    IDialogsStopLoadAction
} from './types/dialogTypes'
import { AxiosDialogResponseData } from '../../models/DialogModel'

export const addDialog = (dialogData: AxiosDialogResponseData): IDialogsCreateAction => {
    return {
        type: DialogTypeAction.CREATE_DIALOG,
        payload: dialogData
    }
}

export const setCurrentDialog = (dialogData: AxiosDialogResponseData): IDialogsSetCurrentAction => {
    return {
        type: DialogTypeAction.CURRENT_DIALOG,
        payload: dialogData
    }
}

export const unSetCurrentDialog = (): IDialogsUnSetCurrentAction => {
    return {
        type: DialogTypeAction.UNSET_CURRENT_DIALOG,
        payload: null
    }
}

export const addAllDialogs = (dialogsData: AxiosDialogResponseData[]): IDialogsFetchAction => {
    return {
        type: DialogTypeAction.FETCH_DIALOGS,
        payload: dialogsData
    }
}

export const deleteDialog = (dialogId: string): IDialogsRemoveAction => {
    return {
        type: DialogTypeAction.REMOVE_DIALOG,
        payload: dialogId
    }
}

export const startDialogLoading = (): IDialogsStartLoadAction => {
    return {
        type: DialogTypeAction.START_LOADING,
        payload: true
    }
}

export const stopDialogloading = (): IDialogsStopLoadAction => {
    return {
        type: DialogTypeAction.STOP_LOADING,
        payload: false
    }
}