import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SigninSchema } from '../schema/SigninSchema';
import { initialValues, SigninFormValues } from '../utility/SigninUtility';
import CustomSnackbar from './SnackbarComponent';
import { login } from '../app/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks/hook';

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, success, token } = useAppSelector((state) => state.auth);

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

  useEffect(() => {
    // dispatch(clearState())
    if (success) {
      setSnackbarSeverity('success');
      setSnackbarMessage('Login successful');
      setSnackbarOpen(true);
      setBtnDisable(false);
      if (token) {
        navigate('/Home');
      }
    } else if (error) {
      setSnackbarSeverity('error');
      setSnackbarMessage(error);
      setSnackbarOpen(true);
      setBtnDisable(false);
    }
  }, [success, error, token, navigate]);

  const handleSubmit = async (values: SigninFormValues) => {
    setBtnDisable(true);
    await dispatch(login(values));
  };

  return (
    <div className="p-3 bg-gradient-to-r from-amber-50 to-violet-100 flex items-center justify-center h-screen">
      <div className="max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
        <Formik initialValues={initialValues} validationSchema={SigninSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <Field type="email" id="email" name="email" className="border p-2 w-full rounded-md outline-none" placeholder="Enter your email" />
              <div className="h-1">
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">Password</label>
              <Field type="password" id="password" name="password" className="border p-2 w-full rounded-md outline-none" placeholder="Enter your password" />
              <div className="h-1">
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
            </div>
            <div className="mb-4">
              <Link to="/ForgotPassword" className="text-blue-500">Forgot your password?</Link>
            </div>
            <button type="submit" disabled={btnDisable} className={`${btnDisable ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white px-4 py-2 rounded w-full`}>
              Sign In
            </button>
            <div className="mt-4 text-center">
              <span className="text-gray-600">Don't have an account?</span> {' '}
              <Link to="/Signup" className="text-blue-500">Sign up</Link>
            </div>
          </Form>
        </Formik>
      </div>
      <CustomSnackbar open={snackbarOpen} onClose={handleClose} message={snackbarMessage} severity={snackbarSeverity} />
    </div>
  );
};

export default SigninForm;
