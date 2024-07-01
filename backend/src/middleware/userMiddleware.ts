import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

// Define the validation schema using Yup
const createUserSchema = yup.object().shape({
    firstName: yup.string().required('First name is required').min(3, 'First name must be at least 3 characters'),
    lastName: yup.string().required('Last name is required').min(3, 'First name must be at least 3 characters'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

// Define the validation schema using Yup
const LoginUserSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

// Middleware to validate the request body against the schema
export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate request body against schema
        await createUserSchema.validate(req.body);
        next(); // Proceed to next middleware if validation succeeds
    } catch (error: any) {
        // Send 400 Bad Request if validation fails
        res.status(400).json({ success: false, error: error.message });
    }
};

// Middleware to validate the request body against the schema
export const validateLoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validate request body against schema
        await LoginUserSchema.validate(req.body);
        next(); // Proceed to next middleware if validation succeeds
    } catch (error: any) {
        // Send 400 Bad Request if validation fails
        res.status(400).json({ success: false, error: error.message });
    }
};
