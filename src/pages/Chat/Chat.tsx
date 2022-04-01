import { useEffect, useMemo, useState, FC, ChangeEvent, useRef, SyntheticEvent, KeyboardEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    unSetCurrentDialog,
    RootState,
    AxiosDialogResponseData,
    fetchMessages,
    fetchDialogByTd,
    createMessage,
    TypeMessage,
    updateStatus,
    updateLocalStatus,
    addMessage,
    updateLocalStatusAll,
    createFileMessage,
    FileApi
} from '../../core'
import { Main } from '../../layouts'
import socket from '../../socket'
import './chat.scss'
import { Footer } from './footer/Footer'
import { Header } from './header/Header'
import { Body } from './body/Body'
import { Loading } from '../../components'

interface ISocketDataMessage {
    newMessage: TypeMessage,
    partner: string,
    author: string
}

const Chat: FC = () => {

    const dispatch = useDispatch()
    const dialogs = useSelector<RootState, AxiosDialogResponseData[]>(state => state.dialogs.dialogs)
    const selfId = useSelector<RootState, string>(state => state.auth.user._id)
    const messages = useSelector<RootState, TypeMessage[]>(state => state.messages.messages)
    let currentDialogData = useSelector<RootState, AxiosDialogResponseData | null>(state => state.dialogs.currentDialog)
    const currentUpdate = useSelector<RootState, AxiosDialogResponseData | null>(state => state.dialogs.currentDialog)
    const isLoading = useSelector<RootState, boolean>(state => state.messages.loading)
    const [value, setValue] = useState('')
    const [isTyping, setTyping] = useState(false)
    const inputRef = useRef(null);


    // получаем данные текущего диалога по его id
    const fetchCurrentDialogData = (): AxiosDialogResponseData | null => {
        if (dialogs.length > 0) {
            const foundDialogArray = dialogs.filter((dialog, _) => {
                return dialog._id === window.location.pathname.split('/')[2]
            })
            return foundDialogArray[0]
        } else {
            return null
        }
    }


    const sendMessage = (e: SyntheticEvent, emoji?: string) => {
        if (currentDialogData) {
            dispatch(createMessage({
                dialog_id: currentDialogData._id,
                text: !emoji ? value : emoji,
                attachments: !emoji ? [] : [emoji]
            }))
            setValue('')
        }
    }

    const typingMessage = (e: KeyboardEvent<HTMLInputElement>) => {
        if (currentDialogData) {
            console.log(window.location.origin)
            socket.emit('TYPING MESSAGE', { dialogId: currentDialogData._id, userId: selfId })
        }
    }

    const sendFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (currentDialogData) {
            if (event.target.files) {
                const files = []
                for (let i = 0; i < event.target.files.length; i++) {
                    files.push(event.target.files[i])
                }
                dispatch(createFileMessage({
                    dialog_id: currentDialogData._id,
                    text: files[files.length - 1].name,
                    attachments: [...files],
                    author: selfId
                }))
                setValue('')
            }
        }
    }

    const downloadFile = async (filename: string) => {
        await FileApi.downloadFile(filename)
    }

    currentDialogData = useMemo(() => {
        if (!currentDialogData) {
            return fetchCurrentDialogData()
        }
        return currentDialogData
    }, [messages])

    const partner = useMemo(() => {
        if (currentDialogData && selfId) {
            switch (selfId) {
                case currentDialogData.author._id: return currentDialogData.partner
                case currentDialogData.partner._id: return currentDialogData.author
                default: return null
            }
        }
    }, [messages, currentUpdate])

    useEffect(() => {

        if (currentDialogData) {
            dispatch(fetchMessages(currentDialogData))
        }


        let parseUserInformation = setInterval(() => {
            if (currentDialogData) {
                dispatch(fetchDialogByTd(currentDialogData?._id))
            }
        }, 35000)

        socket.on('NEW MESSAGE', (data: ISocketDataMessage) => {
            if (data.newMessage.dialog_id === currentDialogData?._id && data.newMessage.author !== selfId) {
                dispatch(updateStatus(data.newMessage._id))
            }
        })

        socket.on('UPDATE MESSAGE STATUS', (data: ISocketDataMessage) => {
            if (data.newMessage.dialog_id === currentDialogData?._id && data.newMessage.author !== selfId) {
                dispatch(addMessage(data.newMessage))
            } else {
                dispatch(updateLocalStatus(data.newMessage))
            }
        })

        socket.on('UPDATE ALL MESSAGES', (data: { dialogId: string, userId: string }) => {
            if (data.dialogId === currentDialogData?._id && data.userId !== selfId) {
                dispatch(updateLocalStatusAll(data.dialogId))
            }
        })

        let typingInterval: ReturnType<typeof setTimeout>
        socket.on('TYPING MESSAGE', (data: { dialogId: string, userId: string }) => {
            if (data.dialogId === currentDialogData?._id && data.userId !== selfId) {
                setTyping(true)
                clearInterval(typingInterval)
                typingInterval = setTimeout(() => {
                    setTyping(false)
                }, 3000)
            }
        })

        return () => {
            clearInterval(parseUserInformation)
            socket.removeAllListeners('NEW MESSAGE')
            socket.removeAllListeners('UPDATE MESSAGE STATUS')
            socket.removeAllListeners('TYPING MESSAGE')
            socket.off("connect_error", () => {
                console.log('disconnect');
            });
            dispatch(unSetCurrentDialog())
        }
    }, [])


    if (isLoading) {
        return (
            <Loading />
        )
    }
    return (
        <Main>
            <div className='chat__container'>
                <div className='chat__flexbox'>
                    <Header partner={partner} />
                    <Body isTyping={isTyping} messages={messages} selfId={selfId} partner={partner} downloadFile={downloadFile} />
                    <Footer
                        value={value}
                        setValue={setValue}
                        sendMessage={sendMessage}
                        sendFile={sendFile}
                        typingMessage={typingMessage}
                        ref={inputRef} />
                </div>
            </div>
        </Main >
    )
}


export default Chat;