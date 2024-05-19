import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ResetPasswordSchema } from '../schema/ResetPasswordSchema';
import { initialValues, ResetPasswordFormValues } from '../utility/ResetPasswordUtility';
import { resetPassword } from '../api/userAuth';
import CustomSnackbar from './SnackbarComponent';

const ResetPassword: React.FC = () => {
    const { resetToken } = useParams<{ resetToken?: string }>();
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success' | 'info' | 'warning'>('error');
    const [btnDisable, setBtnDisable] = useState<boolean>(false);

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleSubmit = async (values: ResetPasswordFormValues) => {
        try {
            setBtnDisable(true);
            if (resetToken) {
                const response = await resetPassword(resetToken, values.password);
                if (response.success) {
                    setSnackbarOpen(true);
                    setSnackbarMessage(response.message);
                    setSnackbarSeverity("success");
                } else {
                    setBtnDisable(false);
                    setSnackbarOpen(true);
                    setSnackbarMessage(response.error);
                    setSnackbarSeverity("error");
                }
            } else {
                throw new Error("Reset token is missing");
            }
        } catch (error: any) {
            setBtnDisable(false);
            setSnackbarOpen(true);
            setSnackbarMessage(error.message);
            setSnackbarSeverity("error");
        }
    };

    return (
        <div className="p-3 bg-gradient-to-r from-amber-50 to-violet-100 flex items-center justify-center h-screen">
            <div className="max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
                <Formik initialValues={initialValues} validationSchema={ResetPasswordSchema} onSubmit={handleSubmit}>
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-1">New Password</label>
                            <Field type="password" id="password" name="password" className="border p-2 w-full rounded-md outline-none" placeholder="Enter your new password" />
                            <div className="h-1">
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                            </div>
                        </div>
                        <button type="submit" disabled={btnDisable} className={`${btnDisable ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                            } text-white px-4 py-2 rounded w-full mt-2`}>
                            Reset Password
                        </button>
                    </Form>
                </Formik>
            </div>
            <CustomSnackbar open={snackbarOpen} onClose={handleClose} message={snackbarMessage} severity={snackbarSeverity} />
        </div>
    );
};

export default ResetPassword;

