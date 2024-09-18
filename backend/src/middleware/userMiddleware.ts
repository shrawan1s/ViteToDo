import { Request, Response, NextFunction, RequestHandler } from 'express';
import * as yup from 'yup';
import jwt from 'jsonwebtoken';

// Define the validation schema using Yup
const createUserSchema = yup.object().shape({
    firstName: yup.string()
        .required('First name is required')
        .min(3, 'First name must be at least 3 characters')
        .max(30, "First name must be at most 30 characters"),
    lastName: yup.string()
        .required('Last name is required')
        .min(3, 'First name must be at least 3 characters')
        .max(30, "Last name must be at most 30 characters"),
    email: yup.string().email().required('Email is required'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(100, "Password must be at most 100 characters")
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

// Define the type for AuthenticatedRequest
export type AuthenticatedRequest = Request & {
    user?: { id: string };
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const fetchUser: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Get token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Authentication token is missing or invalid" });
    }

    // Extract token from the header
    const token = authHeader.split(' ')[1];

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, JWT_SECRET) as { user: { id: string } };
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};
