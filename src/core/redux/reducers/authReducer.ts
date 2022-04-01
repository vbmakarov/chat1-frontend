import { AuthActionTypes, AuthTypeAction } from '../actions/types/authTypes'
import { TUserResponseData } from '../../models/AuthModel'

type AuthState = {
    isAuth: boolean,
    error: boolean,
    user: TUserResponseData
}

const initialState: AuthState = {
    isAuth: false,
    error: false,
    user: {
        _id: '',
        email: '',
        name: '',
        lastname: '',
    }

}

const authReducer = (state = initialState, action: AuthActionTypes): typeof initialState => {
    switch (action.type) {
        case AuthTypeAction.AUTH_SUCCESS:
            return {
                ...state, isAuth: true, error: false, user: action.payload
            }
        case AuthTypeAction.SET_AVATAR:
            return {
                ...state, isAuth: true, error: false, user: action.payload
            }
        case AuthTypeAction.AUTH_FAILED:
            return {
                ...state, isAuth: false, error: !state.error
            }
        case AuthTypeAction.AUTH_LOGOUT:
            return {
                ...state, isAuth: false, error: false
            }

        default: return state
    }
}

export default authReducer

