import { RootState } from '../store'
import { ThunkAction } from 'redux-thunk'
import { addDialog, addAllDialogs, DialogApi, ActionDialogTypes, setCurrentDialog, deleteDialog, startDialogLoading, stopDialogloading } from '../../../core'

type ThunkDialog = ThunkAction<Promise<void>, RootState, {}, ActionDialogTypes>

export const fetchDialogs = (): ThunkDialog => async (dispatch) => {
    try {
        dispatch(startDialogLoading())
        const dialogs = await DialogApi.fetchDialogs()
        dispatch(addAllDialogs(dialogs.data))
        dispatch(stopDialogloading())
    } catch (e) {
        //TODO: продумать логику если произошла ошибка на сервере и получение диалогов не удалось
    }
}

export const createDialog = (author_id: string, partner_id: string): ThunkDialog => async (dispatch, getState) => {

    try {
        const dialog = await DialogApi.createDialog(author_id, partner_id)
        if (dialog) {
            const dialogs = getState().dialogs.dialogs
            if (dialogs.length) {
                const result = dialogs.filter((item, index) => {
                    return item._id === dialog.data._id
                })
                if (!result.length) {
                    dispatch(addDialog(dialog.data))
                }
            }
            dispatch(setCurrentDialog(dialog.data))
        } else {
            //TODO: если не удалось создать диалог....
        }

    } catch (e) {
        //TODO: продумать логику если произошла ошибка на сервере и создание диалога не удалось
    }
}

export const fetchDialogByTd = (dialogId: string): ThunkDialog => async (dispatch) => {
    try {
        const dialog = await DialogApi.fetchDialogByTd(dialogId)
        dispatch(setCurrentDialog(dialog.data))
    } catch (e) {
        //TODO: продумать логику если произошла ошибка на сервере и получение диалогов не удалось
    }
}

export const removeDialog = (dialogId: string): ThunkDialog => async (dispatch) => {
    try {
        const result = await DialogApi.removeDialog(dialogId)
        if (result.status === 200 && result.data.removeDialogs > 0) {
            dispatch(deleteDialog(dialogId))
        }
    } catch (e) {
        //TODO: продумать логику если произошла ошибка на сервере и получение диалогов не удалось
    }
}