import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import { signupUser } from '../api/userAuth';

// Define TypeScript types for form values
type SignupFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

// Define custom Yup validation function for password
const passwordValidation = Yup.string()
    .required('Password is required')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .min(6, 'Password must be at least 6 characters');

// Define Yup schema for form validation
const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: passwordValidation,
});

const PasswordField: React.FC<{}> = () => {
    const [field, meta, helpers] = useField('password');

    // Set field as touched only when user starts typing
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(event.target.value);
        if (!meta.touched) {
            helpers.setTouched(true);
        }
    };

    return (
        <>
            <input
                {...field}
                type="password"
                className="border p-2 w-full rounded-md outline-none"
                placeholder="Enter your password"
                onChange={handleInputChange} // Use handleInputChange for onChange event
            />
            {meta.error && meta.touched ? (
                <div className="h-1">
                    <div className="text-red-500">{meta.error}</div>
                </div>
            ) : (
                <div className="h-1">
                </div>
            )}
        </>
    );
};

const SignupForm: React.FC = () => {
    // Initial values for the form
    const initialValues: SignupFormValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    // Defining the useNavigate hook for the navigation.
    const navigate = useNavigate();

    // Form submission handler
    const handleSubmit = async (values: SignupFormValues) => {
        const response = await signupUser(values);
        if (response.success) {
            localStorage.setItem("data", JSON.stringify(response.authToken));
            navigate('/Home');
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
        </div>
    );
};

export default SignupForm;
