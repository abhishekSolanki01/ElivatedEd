import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useRecoilValue } from 'recoil';
import { snackBarState } from '../../store/atoms/snackBar';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackBar() {
    const { message, type, isOpen, triggerOpen, showAlert, showSnackBar } = useRecoilValue(snackBarState)


    const [open, setOpen] = React.useState(isOpen);

    const handleOpen = () => {
        setOpen(true);
    };

    React.useEffect (() => {
        isOpen && handleOpen()
    }, [isOpen, triggerOpen])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            {/* {showSnackBar && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>} */}

            {type === 'error' && showSnackBar && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>}
            {type === 'warning' && showSnackBar && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>}
            {type === 'info' && showSnackBar && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>}
            {type === 'success' && showSnackBar && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>}


            {type === 'error' && showAlert && <Alert severity="error">{message}</Alert>}
            {type === 'warning' && showAlert && <Alert severity="warning">{message}</Alert>}
            {type === 'info' && showAlert && <Alert severity="info">{message}</Alert>}
            {type === 'success' && showAlert && <Alert severity="success">{message}</Alert>}
        </Stack>
    );
}