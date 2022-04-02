import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { AxiosAuthResponse } from '../models/AuthModel'
import { config } from '../../config'

export class Service {

    $axiosInstance: AxiosInstance
    _retry: boolean

    constructor() {
        this._retry = false
        this.$axiosInstance = axios.create({
            baseURL: config.SERVER_URL,
            withCredentials: true
        })
        this.interceptorCreate()
    }

    interceptorCreate() {

        this.$axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
            (config.headers ??= {}).Authorization = `Bearer ${localStorage.getItem('accessToken')}`
            return config
        })

        this.$axiosInstance.interceptors.response.use((response) => {
            return response
        }, async (error) => {
            //Если статус код 401 - пользователь не авторизован
            if (error.response.status === 401 && error.config && !this._retry) {
                //Исключаем бесконечную зацикленность если еще раз пришел статус код 401
                this._retry = true;
                try {
                    const response = await this.refreshAuth()
                    // если все ОК записываем AccessToken в localStorage
                    localStorage.setItem('accessToken', response.data.accessToken)
                    window.location.reload()
                } catch (e) {
                    this._retry = false;
                    console.log('Пользователь не авторизован!!')
                }
            }

            this._retry = false;
            // Ошибка с любым статусом кроме 401
            throw error;
        });

    }

    async refreshAuth() {
        return await this.$axiosInstance.get<AxiosAuthResponse>('/api/refresh')
    }
}