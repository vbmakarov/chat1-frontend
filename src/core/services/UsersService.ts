import { Service } from './Service'
import { AxiosUsersResponse } from '../models/UsersModel'

class UsersService extends Service {
    async fetchAllUsers() {
        return await this.$axiosInstance.get<AxiosUsersResponse>('/api/users')
    }
}

export default new UsersService()