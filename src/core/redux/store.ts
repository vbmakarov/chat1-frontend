import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import usersReducer from './reducers/usersReducer'
import dialogReducer from './reducers/dialogReducer'
import loadReducer from './reducers/loadReducer'
import messageReducer from './reducers/messageReducer'
import { composeWithDevTools } from '@redux-devtools/extension';


const rootReducer = combineReducers({
    loading: loadReducer,
    auth: authReducer,
    users: usersReducer,
    dialogs: dialogReducer,
    messages: messageReducer
})

export const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch