import { TypeMessage } from '../../../core'
import {
    ActionMessageTypes,
    MessageTypeAction,
    IMessageFetchAction,
    IMessageCreateAction,
    IMessageUnsetAction,
    IMessageUpdateStatusAction,
    IMessageUpdateAllStatusAction,
    IMessageStopLoadAction,
    IMessageStartLoadAction
} from '../actions/types/messageTypes'

export const addMessage = (messageData: TypeMessage): IMessageCreateAction => {
    return {
        type: MessageTypeAction.CREATE_MESSAGE,
        payload: messageData
    }
}


/*export const unsetMessage = (): IMessageUnsetAction => {
    return {
        type: MessageTypeAction.UNSET_MESSAGE,
        payload: TypeMessage
    }
}*/

export const fetchAllMessages = (messagesData: TypeMessage[]): IMessageFetchAction => {
    return {
        type: MessageTypeAction.FETCH_MESSAGES,
        payload: messagesData
    }
}

export const updateLocalStatus = (messagesData: TypeMessage): IMessageUpdateStatusAction => {
    return {
        type: MessageTypeAction.UPDATE_MESSAGE_STATUS,
        payload: messagesData
    }
}

export const updateLocalStatusAll = (dialogId: string): IMessageUpdateAllStatusAction => {
    return {
        type: MessageTypeAction.UPDATE_ALL_MESSAGES_STATUS,
        payload: dialogId
    }
}

export const MessagesStartLoading = (): IMessageStartLoadAction => {
    return {
        type: MessageTypeAction.START_LOADING,
        payload: true
    }
}

export const MessagesStopLoading = (): IMessageStopLoadAction => {
    return {
        type: MessageTypeAction.STOP_LOADING,
        payload: false
    }
}