export type TUsersResponseData = {
    _id: string,
    email: string,
    name: string,
    lastname: string,
    lastseen: string,
    avatar?: string
}

export type AxiosUsersResponse = TUsersResponseData[]