export enum LoadTypeAction {
    LOADING_START = 'LOADING_START',
    LOADING_FINISH = 'LOADING_FINISH',
}

export interface ILoadStartAction {
    type: LoadTypeAction.LOADING_START,
    payload: true
}


export interface ILoadFinishAction {
    type: LoadTypeAction.LOADING_FINISH,
    payload: false
}

export type ActionLoadingTypes = ILoadStartAction | ILoadFinishAction