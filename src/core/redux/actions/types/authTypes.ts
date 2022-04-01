import { TUserResponseData } from '../../../models/AuthModel'

export enum AuthTypeAction {
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAILED = 'AUTH_FAILED',
    AUTH_LOGOUT = 'AUTH_LOGOUT',
    SET_AVATAR = 'SET_AVATAR',
}

type IAuthSuccessAction = {
    type: AuthTypeAction.AUTH_SUCCESS,
    payload: TUserResponseData
}

type IAuthFailedAction = {
    type: AuthTypeAction.AUTH_FAILED,
    payload?: TUserResponseData
}

type IAuthLogoutAction = {
    type: AuthTypeAction.AUTH_LOGOUT,
    payload?: TUserResponseData
}

export interface IAvatarFetchAction {
    type: AuthTypeAction.SET_AVATAR,
    payload: TUserResponseData
}

export type AuthActionTypes = IAuthFailedAction | IAuthLogoutAction | IAuthSuccessAction | IAvatarFetchAction