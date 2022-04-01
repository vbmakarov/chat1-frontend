import { useEffect, FC } from 'react'
import { Navigate, NavigateFunction } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login, Registration, Dialogs, Chat, Profile } from '../pages'
import { RootState, checkUser } from '../core/'
import { Loading } from '../components/loading/Loading'

type TRoute = {
    path: string,
    element: JSX.Element | NavigateFunction
}


const Router: FC = () => {

    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth)
    const loading = useSelector<RootState, boolean>(state => state.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            dispatch(checkUser())
        }
    }, [])

    let routes: TRoute[] = [
        { path: '/dialogs/:id', element: <Chat /> },
        { path: '/dialogs', element: <Dialogs /> },
        { path: '/profile', element: <Profile /> },
        { path: '*', element: <Navigate replace to="/dialogs" /> },
    ]

    if (!isAuth) {
        routes = [
            { path: '/login', element: <Login /> },
            { path: '/registration', element: <Registration /> },
            { path: '*', element: <Navigate replace to="/login" /> }
        ]
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => {
                    return (
                        <Route key={route.path + index} path={route.path} element={route.element} />
                    )
                })}
            </Routes>
        </BrowserRouter>
    )
}

export default Router