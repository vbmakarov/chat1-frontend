import { ChangeEvent, useState, forwardRef, SyntheticEvent, KeyboardEvent } from 'react'
import '../chat.scss'
import TextField from '@mui/material/TextField'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Emodji from '../../../components/emoji/Emodji'

interface IPropsFooter {
    value: string,
    setValue: (e: string) => void,
    sendMessage: (e: SyntheticEvent) => void
    sendFile: (event: ChangeEvent<HTMLInputElement>) => void
    typingMessage: (event: KeyboardEvent<HTMLInputElement>) => void
}

export const Footer = forwardRef<HTMLInputElement, IPropsFooter>(({ value, setValue, sendMessage, sendFile, typingMessage }, ref) => {
    const [show, setShow] = useState(false)

    return (
        <div className={show ? 'chat__footer active' : 'chat__footer'}>
            <div className='chat__controls controls'>
                <div className='controls__body'>
                    <div className="controls__input">
                        <label className="controls__file" htmlFor="fileMessage">
                            <AttachFileIcon htmlColor='#707c97' className="controls__attachment" fontSize='medium' />
                            <input type="file" id="fileMessage" name="file" ref={ref} value={''}
                                accept="image/png, image/jpeg, application/pdf, .xlsx,.xls, .doc, .docx, .txt" onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    sendFile(e)
                                }} multiple />
                        </label>
                        <TextField
                            placeholder="Текст сообщения..."
                            multiline
                            rows={2}
                            maxRows={10}
                            variant="standard"
                            style={{ width: '85%' }}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onKeyUp={typingMessage}
                        />
                        <SentimentSatisfiedAltIcon
                            className="controls__emodji"
                            style={{ margin: '20px 5px 0 5px' }}
                            htmlColor='#707c97'
                            fontSize='medium'
                            onClick={() => setShow(!show)}
                        />
                        {value ?
                            <SendIcon color='primary' fontSize='medium' onClick={(e: SyntheticEvent) => sendMessage(e)} style={{ cursor: 'pointer' }} /> :
                            <MicIcon htmlColor='#707c97' fontSize='medium' />
                        }
                    </div>
                </div>
            </div>
            {show ? <Emodji sendMessage={sendMessage} /> : ''}
        </div>
    )
})