import * as Yup from 'yup';

// Define custom Yup validation function for password
const passwordValidation = Yup.string()
    .required('Password is required')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .min(6, 'Password must be at least 6 characters')
    .max(100, "Password must be at most 100 characters");

// Define Yup schema for form validation
export const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('First name is required')
        .min(3, 'First name must be at least 6 characters')
        .max(100, "First name must be at most 100 characters"),
    lastName: Yup.string()
        .required('Last name is required')
        .min(3, 'Last name must be at least 6 characters')
        .max(100, "Last name must be at most 100 characters"),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: passwordValidation,
});
