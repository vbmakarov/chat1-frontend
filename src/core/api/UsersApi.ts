import UsersService from '../services/UsersService'

class UsersApi {
    async fetchAllUsers() {
        try {
            return await UsersService.fetchAllUsers()
        } catch (e) {
            throw e
        }
    }
}

export default new UsersApi()