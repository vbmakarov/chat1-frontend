import { ActionMessageTypes, MessageTypeAction } from '../actions/types/messageTypes'
import { TypeMessage } from '../../../core'

/*export interface IMessageState {
    [dialogId: string]: TypeMessage[]
}

const initialState: IMessageState = {} as IMessageState*/

interface IMesagesState {
    loading: boolean,
    messages: TypeMessage[]
}

const initialState: IMesagesState = {
    loading: false,
    messages: []
}

const messageReducer = (state = initialState, action: ActionMessageTypes): IMesagesState => {
    switch (action.type) {
        case MessageTypeAction.CREATE_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            }
        case MessageTypeAction.FETCH_MESSAGES:
            return {
                ...state,
                messages: [...action.payload]
            }
        case MessageTypeAction.UPDATE_MESSAGE_STATUS:
            if (state.messages.length) {
                const updateMessage: TypeMessage[] = state.messages.map((message, _) => {
                    if (message._id === action.payload._id) {
                        message.read = true
                        return message
                    }

                    return message
                })
                return {
                    ...state,
                    messages: [...updateMessage]
                }
            }
            return state
        case MessageTypeAction.UPDATE_ALL_MESSAGES_STATUS:
            if (state.messages.length) {
                const updateAllMessages: TypeMessage[] = state.messages.map((message, _) => {
                    if (message.dialog_id === action.payload && !message.read) {
                        message.read = true
                        return message
                    }
                    return message
                })
                return {
                    ...state,
                    messages: [...updateAllMessages]
                }
            }
            return state
        case MessageTypeAction.START_LOADING:
            return {
                ...state,
                loading: true,
            }
        case MessageTypeAction.STOP_LOADING:
            return {
                ...state,
                loading: false
            }
        default: return state
    }
}

export default messageReducer