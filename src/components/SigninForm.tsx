import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SigninSchema } from '../schema/SigninSchema';
import { initialValues, SigninFormValues } from '../utility/SigninUtility';
import { useDispatch } from 'react-redux';
import { signin } from '../app/actions/authActions';
import CustomSnackbar from './SnackbarComponent';

const SigninForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: SigninFormValues) => {
    try {
      await dispatch(signin(values.email, values.password));
      // On successful signin, navigate or handle accordingly
      navigate('/Home'); // Adjust navigation as per your application logic
    } catch (error) {
      // Error handling if needed (handled in Redux actions)
    }
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
      <CustomSnackbar /> {/* Connect CustomSnackbar with Redux if needed */}
    </div>
  );
};

export default SigninForm;
