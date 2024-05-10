import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../model/userSchema'; // Assuming you have a User model defined
import { validateCreateUser } from '../middleware/userMiddleware';
import { fetchUser, AuthenticatedRequest } from '../middleware/fetchUser';

const JWT_SECRET = 'harryiagoodb$oy';

const router = express.Router();

// ROUTE 1: Create a user using: POST "/api/auth/createuser". No login required.
router.post('/createuser', validateCreateUser, async (req: Request, res: Response) => {
    let success = false;
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check whether the user with the email exists already.
        let user: UserDocument | null = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ success, error: "Email already exists" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);
            // Create a new user.
            user = await User.create({
                firstName,
                lastName,
                email,
                password: secPass
            });
        }

        const data = {
            user: {
                id: user?.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Authenticate a user using: POST "/api/auth/login". No login required.
router.post('/login', async (req: Request, res: Response) => {
    let success = false;
    const { email, password } = req.body;

    try {
        // Check whether the user with the email exists already.
        let user: UserDocument | null = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success, error: "Please enter correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(401).json({ success, error: "Please enter correct credentials" });
        } else {
            const data = {
                user: {
                    id: user.id
                }
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({ success, authToken });
        }
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Get user details using: POST "/api/auth/getuser". Login required.
router.post('/getuser', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
