import { Service } from './Service'
import { AxiosDialogResponseData } from '../models/DialogModel'

class DialogService extends Service {
    async fetchDialogs() {
        return await this.$axiosInstance.get<AxiosDialogResponseData[]>('/api/dialogs')
    }

    async createDialog(author_id: string, partner_id: string) {
        return await this.$axiosInstance.post<AxiosDialogResponseData>('/api/dialogs', {
            author: author_id,
            partner: partner_id
        })
    }

    async fetchDialogByTd(dialogId: string) {
        return await this.$axiosInstance.post<AxiosDialogResponseData>('/api/dialog', {
            dialogId
        })
    }

    async removeDialog(dialogId: string) {
        return await this.$axiosInstance.delete('/api/dialogs/' + dialogId)
    }
}

export default new DialogService()