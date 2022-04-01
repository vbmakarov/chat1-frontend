import { TUsersResponseData } from "../../../models/UsersModel";


export enum UsersTypeAction {
    FETCH_USERS = 'FETCH_USERS',
}


export interface IUsersFetchAction {
    type: UsersTypeAction.FETCH_USERS,
    payload: TUsersResponseData[] | []
}

export type ActionUsersTypes = IUsersFetchAction

