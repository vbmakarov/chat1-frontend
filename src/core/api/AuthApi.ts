import { TRegistrationRequestData, TLoginRequestData, TUpdateUserRequestData } from '../models/AuthModel'
import AuthService from '../services/AuthService'

class AuthApi {

    async registration(data: TRegistrationRequestData) {
        try {
            return await AuthService.registration(data)
        } catch (e) {
            throw e
        }
    }

    async login(data: TLoginRequestData) {
        try {
            return await AuthService.login(data)
        } catch (e) {
            throw e
        }
    }

    async logOut() {
        try {
            return await AuthService.logOut()
        } catch (e) {
            throw e
        }
    }

    async checkAuth() {
        try {
            return await AuthService.refreshAuth()
        } catch (e) {
            throw e
        }
    }

    async updateUserData(data: TUpdateUserRequestData) {
        try {
            return await AuthService.updateUserData(data)
        } catch (e) {
            throw (e)
        }
    }

}

export default new AuthApi()