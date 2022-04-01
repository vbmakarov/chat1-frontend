import { Service } from './Service'
import { TypeMessage, NewMessageTypeParams } from '../models/MessageModel'

class MessageService extends Service {
    async fetch(id: string) {
        return await this.$axiosInstance.get<TypeMessage[]>('/dialogs/' + id)
    }

    async create(data: NewMessageTypeParams) {
        return await this.$axiosInstance.post<TypeMessage>('/message', data)
    }

    async delete() {
        return await this.$axiosInstance.delete('/message/:id')
    }

    async updateReadStatusOne(messageId: string) {
        return await this.$axiosInstance.post('/message/update', {
            messageId
        })
    }

}

export default new MessageService()