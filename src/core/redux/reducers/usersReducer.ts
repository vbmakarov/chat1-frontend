import { ActionUsersTypes, UsersTypeAction } from '../actions/types/usersTypes'
import { TUsersResponseData } from '../../models/UsersModel'

const initialState: TUsersResponseData[] = []

const userReducers = (state = initialState, action: ActionUsersTypes): typeof initialState => {
    switch (action.type) {
        case UsersTypeAction.FETCH_USERS: return [...action.payload]
        default: return state
    }
}

export default userReducers