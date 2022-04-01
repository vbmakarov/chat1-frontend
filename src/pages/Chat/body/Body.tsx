import { FC, useRef, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';
import { status } from '../../../utils'
import { fetchAttachmentsFiles } from '../functions'
import {
    TypeMessage,
    TUsersResponseData,
} from '../../../core'
import { config } from '../../../config'

interface IPropsBody {
    messages: TypeMessage[]
    selfId: string,
    partner: TUsersResponseData | null | undefined,
    downloadFile: (file: string) => void,
    isTyping: boolean
}

export const Body: FC<IPropsBody> = ({ messages, selfId, partner, downloadFile, isTyping }) => {
    const messagesRef: any = useRef(null)

    useEffect(() => {
        messagesRef?.current?.scrollTo(0, 999999);
    }, [messages, isTyping])


    return (
        <>{messages?.length ?
            <div className='chat__body message' ref={messagesRef}>
                {messages.map((message, index) => {
                    const author = (message.author === selfId)
                    return (
                        <div className="message__data" key={message._id}>
                            <div className={author ? "message__item message__item_a" : "message__item"}>
                                {!author ?
                                    <div className="message__avatar">
                                        <Avatar
                                            alt={
                                                partner?.name && partner?.lastname ?
                                                    partner?.name + ' ' + partner.lastname :
                                                    ''
                                            }
                                            src={
                                                partner?.avatar ?
                                                    config.SERVER_URL + partner?.avatar :
                                                    ''
                                            }
                                            sx={{ width: 70, height: 70 }}
                                        />
                                    </div> :
                                    <div className="message__check">
                                        {message.read ?
                                            <>
                                                <span>&#128504;</span>
                                                <span>&#128504;</span>
                                            </> :
                                            <span>&#128504;</span>
                                        }

                                    </div>

                                }
                                <div className={!author ? "message__text message__text_p" : "message__text message__text_a"}>
                                    {message.text && message.attachments?.length ?
                                        fetchAttachmentsFiles(message.attachments, downloadFile)
                                        : message.text}
                                </div>
                                <div className={!author ? 'message__control' : 'message__control message__control_a'}>
                                    <span>...</span>
                                </div>
                            </div>
                            <div className={!author ? 'message__date' : 'message__date message__date_a'}>{status(message.createdAt, true)}</div>
                        </div>
                    )
                })}
                {isTyping ?
                    <div className="message__typing">{partner?.name + ' ' + partner?.lastname + ' печатает...'}</div> :
                    null}
            </div> :
            <div className="chat__nomessage">
                <span><MarkAsUnreadOutlinedIcon fontSize='large' /></span>
                <span>cообщения отсутствуют</span>
            </div>}
        </>
    )
}