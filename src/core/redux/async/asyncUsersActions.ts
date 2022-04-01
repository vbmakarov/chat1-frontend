import { RootState } from '../store'
import { ActionUsersTypes } from '../actions/types/usersTypes';
import { ThunkAction } from 'redux-thunk'
import UsersApi from '../../api/UsersApi';
import { FetchAllUsersAction } from '../actions/usersActions';

type ThunkUsers = ThunkAction<Promise<void>, RootState, {}, ActionUsersTypes>

export const fetchUsers = (setLoading: (val: boolean) => void): ThunkUsers => async (dispatch) => {
    try {
        setLoading(true)
        const response = await UsersApi.fetchAllUsers()
        dispatch(FetchAllUsersAction(response.data))
        setLoading(false)
    } catch (e) {
        // продумать ситуацию когда пользователи не найдены
    }
}