import MessageService from "../services/MessageService"
import { NewMessageTypeParams } from '../models/MessageModel'

class MessageApi {
    async fecth(currentDialog: string) {
        try {
            return await MessageService.fetch(currentDialog)
        } catch (e) {
            throw (e)
        }
    }

    async create(data: NewMessageTypeParams) {
        try {
            return await MessageService.create(data)
        } catch (e) {
            throw (e)
        }
    }

    async delete() {
        try {
            return await MessageService.delete()
        } catch (e) {
            throw (e)
        }
    }

    async updateReadStatusOne(messageId: string) {
        try {
            return await MessageService.updateReadStatusOne(messageId)
        } catch (e) {
            throw (e)
        }
    }

}

export default new MessageApi()