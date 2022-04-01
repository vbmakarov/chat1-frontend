import { LoadTypeAction, ILoadFinishAction, ILoadStartAction } from './types/loadTypes'

export const startLoading = (): ILoadStartAction => {
    return {
        type: LoadTypeAction.LOADING_START,
        payload: true
    }
}

export const stopLoading = (): ILoadFinishAction => {
    return {
        type: LoadTypeAction.LOADING_FINISH,
        payload: false
    }
}