import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SignupSchema } from '../schema/SignupSchema';
import { initialValues, SignupFormValues } from '../utility/SignupUtility';
import { signupUser } from '../api/userAuth';
import { PasswordField } from './PasswordField';
import CustomSnackbar from './SnackbarComponent';

const SignupForm: React.FC = () => {
    // State for Snackbar
    const [snackbarOpen, setSnackbarOpen] = useState<true | false>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success' | 'info' | 'warning'>('error');

    // Snackbar close handler
    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    // Defining the useNavigate hook for the navigation.
    const navigate = useNavigate();

    // Form submission handler
    const handleSubmit = async (values: SignupFormValues) => {
        try {
            const response = await signupUser(values);
            if (response.success && response.authToken) {
                localStorage.setItem("data", JSON.stringify(response.authToken));
                navigate('/Home');
            } else if ('error' in response) { // Type guard
                // Unsuccessful signin
                setSnackbarOpen(true);
                setSnackbarMessage(response.error); // Access the error property
                setSnackbarSeverity("error");
              }
            } catch (error: any) {
              // Error during signin
              console.log(error);
              setSnackbarOpen(true);
              setSnackbarMessage(error.message);
              setSnackbarSeverity("error");
            }
    };

    return (
        <div className="mt-5 bg-gradient-to-r from-amber-50 to-violet-100 flex items-center justify-center h-screen">
            <div className="max-w-sm w-full">
                <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
                {/* Formik handles form state and submission */}
                <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleSubmit}>
                    {/* Form component represents the form */}
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block mb-1">First Name</label>
                            <Field type="text" id="firstName" name="firstName" className="border p-2 w-full rounded-md outline-none" placeholder="Enter your first name" />
                            <div className="h-1">
                                <ErrorMessage name="firstName" component="div" className="text-red-500" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block mb-1">Last Name</label>
                            <Field type="text" id="lastName" name="lastName" className="border p-2 w-full rounded-md outline-none" placeholder="Enter your last name" />
                            <div className="h-1">
                                <ErrorMessage name="lastName" component="div" className="text-red-500" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1">Email</label>
                            <Field type="email" id="email" name="email" className="border p-2 w-full rounded-md outline-none" placeholder="Enter your email" />
                            <div className="h-1">
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-1">Password</label>
                            <PasswordField />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full my-2">
                            Sign Up
                        </button>
                        <div className="mt-4 text-center">
                            <span className="text-gray-600">Already have an account?</span> {' '}
                            <Link to="/" className="text-blue-500">Sign in</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
            <CustomSnackbar open={snackbarOpen} onClose={handleClose} message={snackbarMessage} severity={snackbarSeverity} />
        </div>
    );
};

export default SignupForm;
