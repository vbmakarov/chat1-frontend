//store
export { store } from './redux/store'

// API
export { default as AuthApi } from './api/AuthApi'
export { default as DialogApi } from './api/DialogApi'
export { default as MessageApi } from './api/MessageApi'
export { default as FileApi } from './api/FileApi'

//types and Interfaces
export type { RootState, AppDispatch } from './redux/store'

//models
export type { AxiosDialogResponseData } from './models/DialogModel'
export type { NewMessageTypeParams, TypeMessage } from './models/MessageModel'
export type { TUserResponseData } from './models/AuthModel'
export type { TUsersResponseData, AxiosUsersResponse } from './models/UsersModel'
export type { IFileMessageResponse } from './models/FileModel'

//Async Actions
export { checkUser, logOut, setNewAvatar } from './redux/async/asyncAuthActions'
export { fetchDialogs, createDialog, fetchDialogByTd, removeDialog } from './redux/async/asyncDialogActions'
export { createMessage, createFileMessage, fetchMessages, updateStatus } from './redux/async/asyncMessageActions'

//Dialog Actions
export { addDialog, addAllDialogs, setCurrentDialog, unSetCurrentDialog, deleteDialog, startDialogLoading, stopDialogloading } from './redux/actions/dialogActions'
export { startLoading, stopLoading } from './redux/actions/loadActions'

//Message Actions
export { addMessage, fetchAllMessages, updateLocalStatus, updateLocalStatusAll, MessagesStartLoading, MessagesStopLoading } from './redux/actions/messageActions'

//types
export type { ActionMessageTypes } from './redux/actions/types/messageTypes'
export type { ActionDialogTypes } from './redux/actions/types/dialogTypes'
export type { ActionLoadingTypes } from './redux/actions/types/loadTypes'