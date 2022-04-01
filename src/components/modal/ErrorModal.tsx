import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { AuthFailedAction } from '../../core/redux/actions/authActions'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

type ErrorModalTypeProps = {
    error: boolean,
    message: string,
    text: string,
    children?: React.Component
}

export default function ErrorModal({ error, message, text }: ErrorModalTypeProps) {
    const dispatch = useDispatch()
    const handleClose = () => dispatch(AuthFailedAction());

    return (
        <div>
            <Modal
                open={error}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Alert severity="error">{message}</Alert>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {text}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}