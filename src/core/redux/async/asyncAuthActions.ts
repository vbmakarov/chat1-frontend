import { RootState } from '../store'
import AuthApi from '../../api/AuthApi'
import FileApi from '../../api/FileApi'
import { ThunkAction } from 'redux-thunk'
import { TRegistrationRequestData, TLoginRequestData, TUpdateUserRequestData } from '../../models/AuthModel'
import { AuthFailedAction, AuthSuccessAction, AuthLogoutAction, AuthSetAvatar } from '../actions/authActions'
import { startLoading, stopLoading } from '../actions/loadActions'
import { AuthActionTypes } from '../actions/types/authTypes';
import { ActionLoadingTypes } from '../actions/types/loadTypes'

type ThunkAuth = ThunkAction<Promise<void>, RootState, {}, AuthActionTypes | ActionLoadingTypes>

export const addUser = (data: TRegistrationRequestData): ThunkAuth => async (dispatch) => {
    try {
        dispatch(startLoading())
        const response = await AuthApi.registration(data)
        localStorage.setItem('accessToken', response.data.accessToken)
        dispatch(AuthSuccessAction(response.data.user))
        dispatch(stopLoading())
    } catch (e) {
        dispatch(AuthFailedAction())
    }

}

export const loginUser = (data: TLoginRequestData): ThunkAuth => async (dispatch) => {
    try {
        dispatch(startLoading())
        const response = await AuthApi.login(data)
        localStorage.setItem('accessToken', response.data.accessToken)
        dispatch(AuthSuccessAction(response.data.user))
        dispatch(stopLoading())
    } catch (e) {
        dispatch(AuthFailedAction())
    }
}

export const logOut = (): ThunkAuth => async (dispatch) => {
    try {
        await AuthApi.logOut()
        localStorage.removeItem('accessToken')
        dispatch(AuthLogoutAction())
    } catch (e) {
        dispatch(AuthFailedAction())
    }
}

export const checkUser = (): ThunkAuth => async (dispatch) => {
    try {
        dispatch(startLoading())
        const response = await AuthApi.checkAuth()
        localStorage.setItem('accessToken', response.data.accessToken)
        dispatch(AuthSuccessAction(response.data.user))
        dispatch(stopLoading())
    } catch (e) {
        dispatch(AuthFailedAction())
    }

}

export const setNewAvatar = (avatarImg: FileList): ThunkAuth => async (dispatch) => {
    try {
        dispatch(startLoading())
        const response = await FileApi.setAvatar(avatarImg)
        console.log(response?.data)
        if (response?.data) {
            dispatch(AuthSetAvatar(response.data))
        }
        dispatch(stopLoading())
    } catch (e) {
        console.log(e)
        dispatch(AuthFailedAction())
    }
}

export const update = (data: TUpdateUserRequestData): ThunkAuth => async (dispatch) => {
    try {
        dispatch(startLoading())
        const response = await AuthApi.updateUserData(data)
        localStorage.setItem('accessToken', response.data.accessToken)
        dispatch(AuthSuccessAction(response.data.user))
        dispatch(stopLoading())
    } catch (e) {
        console.log(e)
        dispatch(AuthFailedAction())
    }
}

