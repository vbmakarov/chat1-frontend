import { AxiosDialogResponseData } from '../../../models/DialogModel'

export enum DialogTypeAction {
    FETCH_DIALOGS = 'FETCH_DIALOGS',
    CREATE_DIALOG = 'CREATE_DIALOG',
    CURRENT_DIALOG = 'CURRENT_DIALOG',
    UNSET_CURRENT_DIALOG = 'UNSET_CURRENT_DIALOG',
    REMOVE_DIALOG = 'REMOVE_DIALOG',
    START_LOADING = 'START_LOADING',
    STOP_LOADING = 'STOP_LOADING'
}

export interface IDialogsFetchAction {
    type: DialogTypeAction.FETCH_DIALOGS,
    payload: AxiosDialogResponseData[] | []
}

export interface IDialogsCreateAction {
    type: DialogTypeAction.CREATE_DIALOG,
    payload: AxiosDialogResponseData
}

export interface IDialogsSetCurrentAction {
    type: DialogTypeAction.CURRENT_DIALOG,
    payload: AxiosDialogResponseData
}

export interface IDialogsUnSetCurrentAction {
    type: DialogTypeAction.UNSET_CURRENT_DIALOG,
    payload: null
}

export interface IDialogsRemoveAction {
    type: DialogTypeAction.REMOVE_DIALOG,
    payload: string
}

export interface IDialogsStartLoadAction {
    type: DialogTypeAction.START_LOADING,
    payload: boolean
}

export interface IDialogsStopLoadAction {
    type: DialogTypeAction.STOP_LOADING,
    payload: boolean
}

export type ActionDialogTypes = IDialogsCreateAction | IDialogsFetchAction | IDialogsSetCurrentAction | IDialogsUnSetCurrentAction | IDialogsRemoveAction | IDialogsStartLoadAction | IDialogsStopLoadAction