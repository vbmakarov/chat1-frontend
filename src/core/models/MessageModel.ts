import { IFileMessageResponse } from './FileModel'
export type TypeMessage = {
    _id: string,
    text: string,
    dialog_id: string,
    author: string,
    read: boolean,
    attachments?: [],
    createdAt: string,
    updatedAt: string
}

export type NewMessageTypeParams = {
    dialog_id: string,
    author?: string,
    text: string
    attachments?: string[] | File[],
}