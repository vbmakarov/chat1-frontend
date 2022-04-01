import { FC } from 'react'
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface IHeaderDilogsProps {
    showUsers: () => void
}

export const Header: FC<IHeaderDilogsProps> = ({ showUsers }) => {
    return (
        <div className="dialogs__header">
            <div className="dialogs__title">
                <h1>Последние сообщения</h1>
                <div className="dialogs__sort"><span>Отсортировать по </span><KeyboardArrowDownIcon /></div>
            </div>
            <button className='dialogs__add' onClick={showUsers}><AddIcon /><span>Cоздать диалог</span></button>
        </div>
    )
}