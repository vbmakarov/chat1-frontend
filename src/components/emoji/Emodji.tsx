import React, { FC, SyntheticEvent } from 'react'
import { config } from '../../config'
import './emoji.scss'

interface IEmojiProps {
    sendMessage: (e: SyntheticEvent, str: string) => void
}

const Emodji: FC<IEmojiProps> = ({ sendMessage }) => {
    const emojis = [
        'astonishment',
        'brains',
        'cat',
        'cry',
        'glasses',
        'green',
        'laugh',
        'love',
        'pleased',
        'sick',
        'silence',
        'snot',
        'stars',
        'surprised',
        'think',
        'tired'
    ]

    const ext = '.svg'

    return (
        <div className="emoji__container">
            {emojis.map((emoji, _) => {
                return <img src={config.SERVER_URL + emoji + ext} alt="emodji" width='50' height='50' className="emoji__item" onClick={(e: SyntheticEvent) => sendMessage(e, emoji + ext)} />
            })}
        </div>
    )
}

export default Emodji