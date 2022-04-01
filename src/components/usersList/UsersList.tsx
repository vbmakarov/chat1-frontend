import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import MessageIcon from '@mui/icons-material/Message';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { RootState, createDialog } from '../../core'
import { useSelector } from 'react-redux'
import { fetchUsers } from '../../core/redux/async/asyncUsersActions'
import { AxiosUsersResponse, TUserResponseData } from '../../core'
import { useNavigate } from 'react-router';
import { config } from '../../config'

export default function UsersList() {

    const dispatch = useDispatch()
    const users = useSelector<RootState, AxiosUsersResponse>(state => state.users)
    const self = useSelector<RootState, TUserResponseData>(state => state.auth.user)
    const currentDialog = useSelector<RootState>(state => state.dialogs.currentDialog?._id)
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (currentDialog) {
            navigate(`/dialogs/${currentDialog}`)
        }
        dispatch(fetchUsers(setLoading))
    }, [currentDialog])


    const newDialog = (author: string, partner: string) => {
        dispatch(createDialog(author, partner))
    }

    if (isLoading) {
        return (
            <h2>Подгружаю список.....</h2>
        )
    }

    if (users.length === 1) {
        return (
            <h2>Список зарегистрированных пользователей пуст</h2>
        )
    }

    return (
        <List sx={{ width: '100%', maxWidth: 500, minWidth: 400, bgcolor: 'background.paper' }}>
            {users.length && users.map((user, _) => {
                if (user._id !== self._id) {
                    return (
                        <ListItem alignItems="flex-start" key={user.email + user._id} sx={{ alignItems: 'center' }}>
                            <ListItemAvatar>
                                <Avatar
                                    alt={user.name + ' ' + user.lastname}
                                    src={user.avatar ? config.SERVER_URL + user.avatar : ''}
                                    sx={{ width: 70, height: 70, marginRight: '15px' }}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.name + ' ' + user.lastname}
                                secondary={
                                    <>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                        </Typography>
                                    </>
                                }
                            />
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<MessageIcon />}
                                sx={{ marginLeft: '20px' }}
                                onClick={() => newDialog(self._id, user._id)}

                            >
                                Начать диалог
                            </Button>
                        </ListItem>
                    )
                }
            })}
        </List>
    );
}
