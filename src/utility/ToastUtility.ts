import { toast } from 'react-toastify';

export const showToast = (type: 'success' | 'error' | 'info' | 'warn', message: string) => {
    switch (type) {
        case 'success':
            toast.success(message);
            break;
        case 'error':
            toast.error(message);
            break;
        case 'info':
            toast.info(message);
            break;
        case 'warn':
            toast.warning(message);
            break;
        default:
            break;
    }
};
