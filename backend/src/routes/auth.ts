import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../model/userSchema';
import { validateCreateUser, validateLoginUser } from '../middleware/userMiddleware';
import { fetchUser, AuthenticatedRequest } from '../middleware/fetchUser';
import { sendPasswordResetEmail } from '../utils/email';
import dotenv from 'dotenv';
import { validateForgotPassword, validateResetPassword } from '../middleware/passwordMiddleware';

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET!;
const router: Router = express.Router();

router.post('/createuser', validateCreateUser, async (req: Request<{}, {}, { firstName: string, lastName: string, email: string, password: string }>, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        let user: UserDocument | null = await User.findOne({ email });
        if (user) return res.status(409).json({ success: false, error: "Email already exists" });

        const salt: string = await bcrypt.genSalt(10);
        const secPass: string = await bcrypt.hash(password, salt);

        user = await User.create({ firstName, lastName, email, password: secPass });

        const data: { user: { id: string } } = { user: { id: user!.id } };
        const authToken: string = jwt.sign(data, JWT_SECRET);

        res.json({ success: true, authToken, message: "User created successfully" });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/login', validateLoginUser, async (req: Request<{}, {}, { email: string, password: string }>, res: Response) => {
    try {
        const { email, password } = req.body;

        let user: UserDocument | null = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, error: "Please enter correct credentials" });

        const passwordCompare: boolean = await bcrypt.compare(password, user.password);
        if (!passwordCompare) return res.status(401).json({ success: false, error: "Please enter correct credentials" });

        const data: { user: { id: string } } = { user: { id: user!.id } };
        const authToken: string = jwt.sign(data, JWT_SECRET);

        res.json({ success: true, authToken, message: "Login successfully" });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/getuser', fetchUser, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId: string = req.user.id;
        const user: UserDocument | null = await User.findById(userId).select("-password");

        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        res.send(user);
    } catch (error: any) {
        res.status(500).send("Internal Server Error");
    }
});

router.post('/forgotpassword', validateForgotPassword, async (req: Request<{}, {}, { email: string }>, res: Response) => {
    try {
        const { email } = req.body;

        const user: UserDocument | null = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        const resetToken: string = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        user.resetToken = resetToken;
        user.resetTokenExpiresAt = new Date(Date.now() + 3600000);

        await user.save();

        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ success: true, message: "Link sent to your email", resetToken });
    } catch (error: any) {
        res.status(500).send("Internal Server Error");
    }
});

router.post('/resetpassword', validateResetPassword, async (req: Request<{}, {}, { resetToken: string, newPassword: string }>, res: Response) => {
    try {
        const { resetToken, newPassword } = req.body;

        const user = await User.findOne({ resetToken });

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        if (user.resetTokenExpiresAt && user.resetTokenExpiresAt < new Date()) {
            return res.status(400).json({ success: false, error: "Reset token has expired" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiresAt = undefined;

        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default router;
