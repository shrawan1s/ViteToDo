import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define TypeScript types for form values
type SigninFormValues = {
  email: string;
  password: string;
};

// Define Yup schema for form validation
const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SigninForm: React.FC = () => {
  // Initial values for the form
  const initialValues: SigninFormValues = {
    email: '',
    password: '',
  };

  // Form submission handler
  const handleSubmit = (values: SigninFormValues) => {
    // Handle form submission logic here
    console.log('Form submitted:', values);
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-violet-100 flex items-center justify-center h-screen">
      <div className="max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
        {/* Formik handles form state and submission */}
        <Formik initialValues={initialValues} validationSchema={SigninSchema} onSubmit={handleSubmit}>
          {/* Form component represents the form */}
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <Field type="email" id="email" name="email" className="border p-2 w-full rounded-md" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="text-red-500 h-6" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1">Password</label>
              <Field type="password" id="password" name="password" className="border p-2 w-full rounded-md" placeholder="Enter your password" />
              <ErrorMessage name="password" component="div" className="text-red-500 h-6" />
            </div>
            <div className="mb-4">
              <Link to="/forgot-password" className="text-blue-500">Forgot your password?</Link>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">
              Sign In
            </button>
            <div className="mt-4 text-center">
              <span className="text-gray-600">Don't have an account?</span> {' '}
              <Link to="/signup" className="text-blue-500">Sign up</Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SigninForm;
