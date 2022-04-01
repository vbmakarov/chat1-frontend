import DialogService from '../services/DialogService'

class DialogApi {
    async fetchDialogs() {
        try {
            return await DialogService.fetchDialogs()
        } catch (e) {
            throw e
        }
    }

    async createDialog(author_id: string, partner_id: string) {
        try {
            return await DialogService.createDialog(author_id, partner_id)
        } catch (e) {
            throw e
        }
    }


    async fetchDialogByTd(dialogId: string) {
        try {
            return await DialogService.fetchDialogByTd(dialogId)
        } catch (e) {
            throw e
        }
    }

    async removeDialog(dialogId: string) {
        try {
            return await DialogService.removeDialog(dialogId)
        } catch (e) {
            throw e
        }
    }
}

export default new DialogApi()