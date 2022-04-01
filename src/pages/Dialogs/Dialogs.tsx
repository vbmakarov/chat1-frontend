import { useState, useEffect, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Main } from '../../layouts'
import { RootState, TypeMessage, AxiosDialogResponseData, removeDialog } from '../../core'
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';
import { fetchDialogs } from '../../core'
import { UsersModal, Loading } from '../../components'
import { Header } from './header/Header'
import { Search } from './search/Search'
import { Dialog } from './dialog/Dialog'
import { Link } from 'react-router-dom'
import socket from '../../socket'
import './dialogs.scss'


interface ISocketDataMessage {
    newMessage: TypeMessage
    partner: string,
    author: string
}

interface ISocketDataUpdateMessage {
    dialogId: string,
    userId: string
}

const Dialogs: FC = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState<boolean>(false)
    const authUser = useSelector<RootState, string>(state => state.auth.user._id)
    const dialogs = useSelector<RootState, AxiosDialogResponseData[]>(state => state.dialogs.dialogs)
    const isLoading = useSelector<RootState, boolean>(state => state.dialogs.loading)
    const [filter, setFilter] = useState('')
    const [typeSearch, setSearchType] = useState('messages');

    useEffect(() => {
        dispatch(fetchDialogs())
        socket.on('NEW MESSAGE', (data: ISocketDataMessage) => {
            if (data.author === authUser || data.partner === authUser) {
                dispatch(fetchDialogs())
            }
        })
        socket.on('UPDATE ALL MESSAGES', (data: ISocketDataUpdateMessage) => {
            dispatch(fetchDialogs())
        })
        socket.on('DELETE DIALOG', (data) => {
            dispatch(fetchDialogs())
        })

        return () => {
            socket.removeAllListeners('NEW MESSAGE')
            socket.removeAllListeners('UPDATE ALL MESSAGES')
            socket.removeAllListeners('DELETE DIALOG')
        }
    }, [])


    const showUsers = () => {
        setShow(!show)
    }

    const remove = (dialogId: string) => {
        dispatch(removeDialog(dialogId))
    }

    if (isLoading) {
        return (
            <Loading />
        )
    }

    const myDialogs = dialogs.map((dialogData, _) => {
        const searchField = typeSearch === 'messages' ?
            dialogData.lastMessage?.text.toLowerCase() || "" :
            dialogData.author._id === authUser ?
                dialogData.partner.name.toLowerCase() + ' ' + dialogData.partner.lastname.toLowerCase() :
                dialogData.author.name.toLowerCase() + ' ' + dialogData.author.lastname.toLowerCase()
        if (searchField.includes(filter)) {
            return (
                <Link key={dialogData._id} to={'/dialogs/' + dialogData._id}>
                    <Dialog data={dialogData} authUserId={authUser} remove={remove} />
                </Link>
            )
        }
    })

    return (
        <Main>
            {show && <UsersModal show={show} setShow={setShow} />}
            <div className='dialogs'>
                <div className='dialogs__container'>
                    <div className="dialogs__box">
                        <Header showUsers={showUsers} />
                        <Search setFilter={setFilter} setSearchType={setSearchType} typeSearch={typeSearch} />
                        <div className="dialogs__items">
                            {dialogs.length ? myDialogs :
                                <div className="dialogs__nodialogs">
                                    <span><MarkAsUnreadOutlinedIcon fontSize='large' /></span>
                                    <span>cписок диалогов пуст</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Main >
    )
}

export default Dialogs