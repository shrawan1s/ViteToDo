import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: { id: string }; // Define the user property
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const fetchUser: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.body['auth-token'] || '';
    if (!token) {
        return res.status(401).json({ error: "Authentication token is missing" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { user: { id: string } };
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please authenticate using a valid token" });
    }
};
