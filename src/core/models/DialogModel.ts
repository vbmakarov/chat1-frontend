import { TUsersResponseData } from './UsersModel'
import { TypeMessage } from './MessageModel'

export type AxiosDialogResponseData = {
    _id: string,
    author: TUsersResponseData,
    partner: TUsersResponseData,
    lastMessage: TypeMessage,
    unreadMessages: []
}