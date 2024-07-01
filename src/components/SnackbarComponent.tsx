import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type SnackbarProps = {
    open: boolean;
    onClose: (_event: React.SyntheticEvent | Event, reason?: string) => void;
    message: string;
    severity: 'error' | 'success' | 'info' | 'warning';
};

const CustomSnackbar: React.FC<SnackbarProps> = ({ open, onClose, message, severity }) => {
    return (
        <div>
            <Snackbar open={open} autoHideDuration={2000} onClose={onClose} anchorOrigin={{vertical:"top",horizontal:"center"}}>
                <Alert
                    onClose={onClose}
                    severity={severity}
                    variant="standard"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CustomSnackbar;
