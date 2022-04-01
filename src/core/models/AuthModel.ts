export type TRegistrationRequestData = {
    name: string,
    lastname: string,
    email: string,
    password: string,
    checkbox: boolean
}

export type TLoginRequestData = {
    email: string,
    password: string,
}

export type TUpdateUserRequestData = {
    _id: string,
    email: string,
    name: string,
    lastname: string,
    phone?: string,
    organization?: string
}

export type TUserResponseData = {
    _id: string,
    email: string,
    name: string,
    lastname: string,
    activationLnk?: string,
    avatar?: string,
    phone?: string,
    organization?: string
}

export type AxiosAuthResponse = {
    accessToken: string,
    refreshToken: string,
    user: TUserResponseData
}