import { Service } from './Service'
import { TypeMessage, NewMessageTypeParams } from '../models/MessageModel'

class MessageService extends Service {
    async fetch(id: string) {
        return await this.$axiosInstance.get<TypeMessage[]>('/api/dialogs/' + id)
    }

    async create(data: NewMessageTypeParams) {
        return await this.$axiosInstance.post<TypeMessage>('/api/message', data)
    }

    async delete() {
        return await this.$axiosInstance.delete('/api/message/:id')
    }

    async updateReadStatusOne(messageId: string) {
        return await this.$axiosInstance.post('/api/message/update', {
            messageId
        })
    }

}

export default new MessageService()