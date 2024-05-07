import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

// Define a new type by augmenting the Request interface
export interface AuthenticatedRequest extends Request {
    user?: any; // Define the user property
}

const JWT_SECRET = 'harryiagoodb$oy';

export const fetchUser: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Get the user from the jwt token and add id to req object.
    const token = req.header('auth-token') || ''; // Use optional chaining and provide a default value
    try {
        const data = jwt.verify(token, JWT_SECRET) as { user: any }; // Type assertion
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};
