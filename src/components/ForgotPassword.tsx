import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ForgotPasswordSchema } from '../schema/ForgotPasswordSchema';
import { initialValues, ForgotPasswordFormValues } from '../utility/ForgotPasswordUtility';
import { forgotPassword } from '../api/userAuth';
import CustomSnackbar from './SnackbarComponent';

const ForgotPassword: React.FC = () => {
  // State for Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState<true | false>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success' | 'info' | 'warning'>('error');
  const [btnDisable, setBtnDisable] = useState<true | false>(false)

  // Snackbar close handler
  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Form submission handler
  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      setBtnDisable(true);
      const response = await forgotPassword(values);
      if (response.success) {
        setSnackbarOpen(true);
        setSnackbarMessage(response.authToken); // Access the error property
        setSnackbarSeverity("error");
        // Successful signin
      } else if ('error' in response) { // Type guard
        // Unsuccessful signin
        setBtnDisable(false);
        setSnackbarOpen(true);
        setSnackbarMessage(response.error); // Access the error property
        setSnackbarSeverity("error");
      }
    } catch (error: any) {
      // Error during signin
      setBtnDisable(false);
      setSnackbarOpen(true);
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
    }
  };

  return (
    <div className="p-3 bg-gradient-to-r from-amber-50 to-violet-100 flex items-center justify-center h-screen">
      <div className="max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Password Reset Link</h2>
        {/* Formik handles form state and submission */}
        <Formik initialValues={initialValues} validationSchema={ForgotPasswordSchema} onSubmit={handleSubmit}>
          {/* Form component represents the form */}
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <Field type="email" id="email" name="email" className="border p-2 w-full rounded-md outline-none" placeholder="Enter your email" />
              <div className="h-1">
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
            </div>
            <button type="submit" disabled={btnDisable} className={`${btnDisable ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              } text-white px-4 py-2 rounded w-full`}>
              {btnDisable ? 'Sending...' : 'Send'}
            </button>
          </Form>
        </Formik>
      </div>
      <CustomSnackbar open={snackbarOpen} onClose={handleClose} message={snackbarMessage} severity={snackbarSeverity} />
    </div>
  );
};

export default ForgotPassword;