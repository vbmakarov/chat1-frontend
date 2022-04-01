import React, { useEffect } from 'react'
import './main.scss'
import avatar from '../../assets/img/default_user.png'
import Avatar from '@mui/material/Avatar';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, setNewAvatar, RootState, TUserResponseData } from '../../core'
import { Loading } from '../../components/loading/Loading'
import { Link } from 'react-router-dom';
import { config } from '../../config'

type IProps = {
    children: React.ReactNode
}

const Main = ({ children }: IProps) => {

    const dispatch = useDispatch()
    const authUser = useSelector<RootState, TUserResponseData>(state => state.auth.user)
    const loading = useSelector<RootState>(state => state.loading)

    const logout = () => {
        dispatch(logOut())
    }

    const changeAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            dispatch(setNewAvatar(event.target.files))
        }
    }


    if (loading) {
        return (
            <Loading />
        )
    }


    return (
        <main>
            <aside>
                <div className="sidebar__container">
                    <div className="sidebar__flexbox">
                        <div className="sidebar__header">
                            <div className="sidebar__user avatar">
                                <div className='avatar__box'>
                                    <Avatar src={
                                        authUser.avatar &&
                                        config.SERVER_URL + authUser.avatar} alt='аватар' sx={{ width: 100, height: 100, marginBottom: '10px' }} />
                                    <label className="avatar__set" htmlFor="avatar">
                                        <AddAPhotoIcon fontSize='large' style={{ color: '#585858' }} />
                                        <input type="file" id="avatar" name="avatar"
                                            accept="image/png, image/jpeg" onChange={changeAvatar} />
                                    </label>
                                </div>
                                <span> {authUser.name ? authUser.name : 'Имя'} {authUser.lastname ? authUser.lastname : 'Фамилия'}</span>
                            </div>
                        </div>
                        <div className="sidebar__menu">
                            <ul>
                                <li><Link to="/dialogs" className="sidebar__link"><MarkUnreadChatAltIcon /><span>Сообщения</span></Link></li>
                                <li><Link to="/profile" className="sidebar__link"><AssignmentIndOutlinedIcon /><span>Профиль</span></Link></li>
                            </ul>
                        </div>
                        <div className="sidebar__footer">
                            <div onClick={logout}><LogoutIcon /> <span>Выйти</span></div>
                        </div>
                    </div>
                </div>
            </aside>
            <section>
                {children}
            </section>
        </main>
    )
}

export default Main