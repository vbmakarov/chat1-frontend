import { FC } from 'react'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { AxiosDialogResponseData, TUsersResponseData } from '../../../core'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { config } from '../../../config'
import { status } from '../../../utils'
import Avatar from '@mui/material/Avatar';

interface IDialogProps {
    data: AxiosDialogResponseData,
    authUserId: string,
    remove: (id: string) => void
}

const getAvatar = (author: TUsersResponseData, partner: TUsersResponseData, selfId: string) => {
    if (author._id === selfId) {
        return partner
    }
    return author
}

export const Dialog: FC<IDialogProps> = ({ data, authUserId, remove }) => {
    const partner = getAvatar(data.author, data.partner, authUserId)
    return (
        <div className="dialog__item">
            <span onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const result = window.confirm('Вы точно хотите удалить этот диалог?')
                if (result) {
                    remove(data._id)
                }
            }}><ClearOutlinedIcon color='warning' sx={{ position: 'absolute', top: 10, right: 10 }} /></span>
            <div className="dialog__header">
                <div className="dialog__user user">
                    <div className="user__avatar">
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
                            sx={{ width: 54, height: 54 }}
                        />
                        {status(partner.lastseen) === 'онлайн' ?
                            <span className="user__online"></span> : ''}
                    </div>
                    <div className="user__block">
                        <div className="user__name">{partner.name} {partner.lastname}</div>
                        <div className="user__status">{status(partner.lastseen) !== 'онлайн' ?
                            'Был(а) в сети ' + status(partner.lastseen) : 'онлайн'}</div>
                    </div>
                    <div className="user__time">Последнее сообщение: {data.lastMessage?.createdAt ? status(data.lastMessage.createdAt, true) : ''}</div>
                </div >
            </div >
            <div className="dialog__body">
                <div className="dialog__text">
                    {data.lastMessage?.text}
                </div>
                {data.lastMessage?.attachments?.length ? <div className="dialog__voice">
                    {/*<KeyboardVoiceIcon /> Прослушайте голосовое сообщение (01:15)*/}
                </div> : ''}
                <div className="dialog__count">
                    {data.unreadMessages.length ? <span>{data.unreadMessages.length}</span> : ''}
                </div>
            </div>
            <div className="dialog__footer">
                {data.lastMessage?.attachments?.length ? <div className="dialog__file">
                    <FileDownloadOutlinedIcon /> <span>Вам отправлены файлы</span>
                </div> : ''}
            </div>
        </div >
    )
}