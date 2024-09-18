import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SigninSchema } from '../schema/SigninSchema';
import { initialValues, SigninFormValues } from '../utility/SigninUtility';
import { login } from '../app/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks/hook';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const [btnDisable, setBtnDisable] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      navigate('/Home');
    }
  }, [token, navigate, dispatch]);

  const handleSubmit = async (values: SigninFormValues) => {
    setBtnDisable(true);
    await dispatch(login(values)).finally(() => setBtnDisable(false));
  };

  return (
    <div className="p-3 bg-gradient-to-r from-amber-50 to-violet-100 flex items-center justify-center h-screen">
      <div className="max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
        <Formik initialValues={initialValues} validationSchema={SigninSchema} onSubmit={handleSubmit}>
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">Email</label>
              <Field type="email" id="email" name="email" className="border p-2 w-full rounded-md outline-none" placeholder="Enter your email" autoComplete="email" />
              <div className="h-1">
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block mb-1">Password</label>
              <div className="relative">
                <Field
                  type={showPassword ? 'text' : 'password'} // Toggle between text and password
                  id="password"
                  name="password"
                  className="border p-2 w-full rounded-md outline-none"
                  placeholder="Enter your password"
                  autoComplete="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>
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
    </div>
  );
};

export default SigninForm;
