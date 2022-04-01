import { TUsersResponseData } from '../../models/UsersModel'
import { UsersTypeAction } from '../actions/types/usersTypes'

export const FetchAllUsersAction = (data: TUsersResponseData[]) => {
    return {
        type: UsersTypeAction.FETCH_USERS,
        payload: data
    }
}