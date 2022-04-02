import { TUserResponseData } from '../models/AuthModel'
import { NewMessageTypeParams, TypeMessage } from '../../core'
import { AxiosResponse } from 'axios'
import { Service } from './Service'

class FileService extends Service {
    async setUserAvatar(avatarImg: FileList) {
        const formData = new FormData()
        if (avatarImg.length > 0) {
            const avatar = avatarImg[0]
            formData.append('avatar', avatar)
            return await this.$axiosInstance.post<TUserResponseData>('/api/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        } else {
            return
        }

    }

    async sendFileMessage(data: NewMessageTypeParams): Promise<AxiosResponse<TypeMessage, any> | null> {
        const formData = new FormData()
        if (data.author && data.attachments && data.attachments.length > 0) {
            data.attachments?.forEach((file, index) => {
                formData.append('files', file)
            })
            formData.append('text', data.text)
            formData.append('dialog_id', data.dialog_id)
            formData.append('author', data.author)
            return await this.$axiosInstance.post('/api/message/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        } return null

    }

    async downloadFile(filename: string) {
        const response = await this.$axiosInstance.get('/api/upload/file/' + filename, { responseType: 'blob' })
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = filename
        document.body.appendChild(link);
        link.click();
        link.remove()
    }
}

export default new FileService()