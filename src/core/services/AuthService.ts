import { TRegistrationRequestData, AxiosAuthResponse, TLoginRequestData, TUpdateUserRequestData } from '../models/AuthModel'
import { Service } from './Service'


class AuthService extends Service {

    async registration(data: TRegistrationRequestData) {
        return await this.$axiosInstance.post<AxiosAuthResponse>('/api/registration', data)
    }

    async login(data: TLoginRequestData) {
        return await this.$axiosInstance.post<AxiosAuthResponse>('/api/login', data)
    }

    async logOut() {
        return await this.$axiosInstance.post('/api/logout')
    }

    async updateUserData(data: TUpdateUserRequestData) {
        return await this.$axiosInstance.post('/api/update', data)
    }

}

export default new AuthService()