import { TypeMessage } from '../../../../core'

export enum MessageTypeAction {
    FETCH_MESSAGES = 'FETCH_MESSAGES',
    CREATE_MESSAGE = 'CREATE_MESSAGE',
    UNSET_MESSAGE = ' UNSET_MESSAGE',
    UPDATE_MESSAGE_STATUS = 'UPDATE_MESSAGE_STATUS',
    UPDATE_ALL_MESSAGES_STATUS = 'UPDATE_ALL_MESSAGES_STATUS',
    START_LOADING = 'START_LOADING',
    STOP_LOADING = 'STOP_LOADING'
}

export interface IMessageFetchAction {
    type: MessageTypeAction.FETCH_MESSAGES,
    payload: TypeMessage[]
}

export interface IMessageCreateAction {
    type: MessageTypeAction.CREATE_MESSAGE,
    payload: TypeMessage
}

export interface IMessageUnsetAction {
    type: MessageTypeAction.UNSET_MESSAGE,
    payload: TypeMessage[]
}

export interface IMessageUpdateStatusAction {
    type: MessageTypeAction.UPDATE_MESSAGE_STATUS,
    payload: TypeMessage
}

export interface IMessageUpdateAllStatusAction {
    type: MessageTypeAction.UPDATE_ALL_MESSAGES_STATUS,
    payload: string
}

export interface IMessageStartLoadAction {
    type: MessageTypeAction.START_LOADING,
    payload: boolean
}

export interface IMessageStopLoadAction {
    type: MessageTypeAction.STOP_LOADING,
    payload: boolean
}

export type ActionMessageTypes = IMessageFetchAction | IMessageCreateAction | IMessageUnsetAction | IMessageUpdateStatusAction | IMessageUpdateAllStatusAction | IMessageStopLoadAction | IMessageStartLoadAction