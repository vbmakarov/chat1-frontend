import { RootState } from '../store'
import { ThunkAction } from 'redux-thunk'
import {
    AxiosDialogResponseData,
    MessageApi,
    FileApi,
    NewMessageTypeParams,
    ActionMessageTypes,
    ActionDialogTypes,
    ActionLoadingTypes,
    addMessage,
    fetchAllMessages,
    setCurrentDialog,
    updateLocalStatus,
    MessagesStartLoading, MessagesStopLoading
} from '../../../core'

type ThunkMessage = ThunkAction<Promise<void>, RootState, {}, ActionMessageTypes | ActionDialogTypes | ActionLoadingTypes>

export const createMessage = (data: NewMessageTypeParams): ThunkMessage => async (dispatch) => {
    try {
        const newMessage = await MessageApi.create(data)
        dispatch(addMessage(newMessage.data))
    } catch (e) {
        console.log(e)
    }
}

export const createFileMessage = (data: NewMessageTypeParams): ThunkMessage => async (dispatch) => {
    try {
        const newMessage = await FileApi.sendFileMessage(data)
        if (newMessage) {
            console.log(newMessage.data)
            dispatch(addMessage(newMessage.data))
        }
    } catch (e) {
        console.log(e)
    }
}

export const fetchMessages = (currentDialog: AxiosDialogResponseData): ThunkMessage => async (dispatch) => {
    try {
        dispatch(MessagesStartLoading())
        dispatch(setCurrentDialog(currentDialog))
        const messages = await MessageApi.fecth(currentDialog._id)
        dispatch(fetchAllMessages(messages.data))
        dispatch(MessagesStopLoading())
    } catch (e) {
        console.log(e)
    }
}


export const updateStatus = (messageId: string): ThunkMessage => async (dispatch) => {
    try {
        await MessageApi.updateReadStatusOne(messageId)
    } catch (e) {
        console.log(e)
    }
}