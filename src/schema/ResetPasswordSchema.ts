import * as Yup from 'yup';

// Define Yup schema for form validation
export const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});
