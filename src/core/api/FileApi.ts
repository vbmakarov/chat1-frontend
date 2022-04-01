import FileService from '../services/FileService'
import { NewMessageTypeParams } from '../../core'

class FileApi {
    async setAvatar(avatarImg: FileList) {
        try {
            return await FileService.setUserAvatar(avatarImg)
        } catch (e) {
            throw e
        }
    }

    async sendFileMessage(data: NewMessageTypeParams) {
        try {
            return await FileService.sendFileMessage(data)
        } catch (e) {
            throw (e)
        }
    }

    async downloadFile(filename: string) {
        try {
            return await FileService.downloadFile(filename)
        } catch (e) {
            throw (e)
        }
    }
}

export default new FileApi()