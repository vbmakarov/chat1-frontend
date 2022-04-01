import { FC } from 'react'
import { status } from '../../../utils'
import { config } from '../../../config'
import { TUsersResponseData } from '../../../core'
import Avatar from '@mui/material/Avatar';

interface IPropsHeader {
    partner: TUsersResponseData | null | undefined
}

export const Header: FC<IPropsHeader> = ({ partner }) => {
    return (
        <div className='chat__header partner'>
            <div className='partner__avatar'>
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
            </div>
            <div className='partner__data'>
                <div className='partner__name'>{partner?.name} {partner?.lastname}</div>
                <div className='partner__status'>{partner?.lastseen ? status(partner.lastseen) : ''}</div>
            </div>
            <div className="partner__control">
                <span className="partner__dotted">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </div>
        </div>
    )
}