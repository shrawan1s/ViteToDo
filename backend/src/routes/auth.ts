import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../model/userSchema';
import { validateCreateUser } from '../middleware/userMiddleware';
import { fetchUser, AuthenticatedRequest } from '../middleware/fetchUser';

const JWT_SECRET = 'harryiagoodb$oy';
const router = express.Router();

// Route for creating a user
router.post('/createuser', validateCreateUser, async (req: Request, res: Response) => {
    let success = false;
    try {
        const { firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string; } = req.body;

        // Check if user with the email already exists
        let user: UserDocument | null = await User.findOne({ email });
        if (user) return res.status(409).json({ success, error: "Email already exists" });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        // Create a new user
        user = await User.create({ firstName, lastName, email, password: secPass });

        // Generate JWT token
        const data = { user: { id: user?.id } };
        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authToken });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route for user login
router.post('/login', async (req: Request, res: Response) => {
    let success = false;
    try {
        const { email, password }: { email: string; password: string; } = req.body;

        // Find user by email
        let user: UserDocument | null = await User.findOne({ email });
        if (!user) return res.status(401).json({ success, error: "Please enter correct credentials" });

        // Compare passwords
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) return res.status(401).json({ success, error: "Please enter correct credentials" });

        // Generate JWT token
        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, JWT_SECRET);

        success = true;
        res.json({ success, authToken });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route for getting user details
router.post('/getuser', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId: string = req.user.id;
        const user: UserDocument | null = await User.findById(userId).select("-password");

        if (!user) return res.status(404).json({ error: "User not found" });

        res.send(user);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
