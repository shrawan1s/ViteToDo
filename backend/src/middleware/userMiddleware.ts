import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

// Define the validation schema
const createUserSchema = yup.object().shape({
    firstName: yup.string().required('First name is required').min(3, 'First name must be at least 3 characters'),
    lastName: yup.string().required('Last name is required').min(3, 'First name must be at least 3 characters'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
});

// Middleware to validate the request body
export const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createUserSchema.validate(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
    }
};
