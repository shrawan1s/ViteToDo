import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

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
