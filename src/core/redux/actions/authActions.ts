import { AuthTypeAction } from './types/authTypes'
import { TUserResponseData } from '../../models/AuthModel'


export const AuthSuccessAction = (data: TUserResponseData) => {
    return {
        type: AuthTypeAction.AUTH_SUCCESS,
        payload: data
    }
}

export const AuthFailedAction = () => {
    return {
        type: AuthTypeAction.AUTH_FAILED,
        payload: {
            _id: '',
            email: '',
            name: '',
            lastname: '',
        }
    }
}

export const AuthLogoutAction = () => {
    return {
        type: AuthTypeAction.AUTH_LOGOUT,
        payload: {
            _id: '',
            email: '',
            name: '',
            lastname: '',
        }
    }
}

export const AuthSetAvatar = (data: TUserResponseData) => {
    return {
        type: AuthTypeAction.SET_AVATAR,
        payload: data
    }
}



