import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

// Define the validation schema using Yup
const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email().required('Email is required')
});

// Define the validation schema using Yup
const resetPasswordSchema = yup.object().shape({
    resetToken: yup.string().required('Email is required'),
    newPassword: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

// Middleware to validate the request body against the schema
export const validateForgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate request body against schema
        await forgotPasswordSchema.validate(req.body);
        next(); // Proceed to next middleware if validation succeeds
    } catch (error: any) {
        // Send 400 Bad Request if validation fails
        res.status(400).json({ success: false, error: error.message });
    }
};

// Middleware to validate the request body against the schema
export const validateResetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate request body against schema
        await resetPasswordSchema.validate(req.body);
        next(); // Proceed to next middleware if validation succeeds
    } catch (error: any) {
        // Send 400 Bad Request if validation fails
        res.status(400).json({ success: false, error: error.message });
    }
};
