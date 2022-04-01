import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { UsersList } from '../../components'


const style = {
    position: 'absolute' as 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

type UsersModalTypeProps = {
    show: boolean,
    setShow: (show: boolean) => void,
    children?: React.Component
}

export default function UsersModal({ show, setShow }: UsersModalTypeProps) {

    const handleClose = () => setShow(!show)

    return (
        <div>
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <UsersList />
                </Box>
            </Modal>
        </div>
    );
}