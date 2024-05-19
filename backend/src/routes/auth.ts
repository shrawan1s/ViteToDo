import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../model/userSchema';
import { validateCreateUser } from '../middleware/userMiddleware';
import { fetchUser, AuthenticatedRequest } from '../middleware/fetchUser';
import { sendPasswordResetEmail } from '../utils/email';

const JWT_SECRET = 'harryiagoodb$oy';
const router = express.Router();

// Route for creating a user
router.post('/createuser', validateCreateUser, async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string; } = req.body;

        // Check if user with the email already exists
        let user: UserDocument | null = await User.findOne({ email });
        if (user) return res.status(409).json({ success: false, error: "Email already exists" });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        // Create a new user
        user = await User.create({ firstName, lastName, email, password: secPass });

        // Generate JWT token
        const data = { user: { id: user?.id } };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ success: true, authToken, message: "User created successfully" });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route for user login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password }: { email: string; password: string; } = req.body;

        // Find user by email
        let user: UserDocument | null = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, error: "Please enter correct credentials" });

        // Compare passwords
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) return res.status(401).json({ success: false, error: "Please enter correct credentials" });

        // Generate JWT token
        const data = { user: { id: user.id } };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ success: true, authToken, message: "Login successfully" });
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

        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        res.send(user);
    } catch (error: any) {
        res.status(500).send("Internal Server Error");
    }
});

// Route for requesting password reset
router.post('/forgotpassword', async (req: Request, res: Response) => {
    try {
        const { email }: { email: string; } = req.body;

        // Find user by email
        const user: UserDocument | null = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, error: "User not found" });

        // Generate JWT token for password reset
        const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Store the reset token and expiration time in the user object
        user.resetToken = resetToken;
        user.resetTokenExpiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

        // Save the updated user object to the database
        await user.save();

        // Send password reset email with token
        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ success: true, message: "Link sent to your email", resetToken, email });
    } catch (error: any) {
        res.status(500).send("Internal Server Error");
    }
});

// Route for resetting password
router.post('/resetpassword', async (req: Request, res: Response) => {
    try {
        // Extract resetToken and newPassword from the request body
        const { resetToken, newPassword } = req.body;

        // Find user by resetToken
        const user = await User.findOne({ resetToken });

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Check if reset token has expired
        if (user.resetTokenExpiresAt && user.resetTokenExpiresAt < new Date()) {
            return res.status(400).json({ success: false, error: "Reset token has expired" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password with the new hashed password
        user.password = hashedPassword;

        // Clear the reset token and expiration time
        user.resetToken = undefined;
        user.resetTokenExpiresAt = undefined;

        // Save the updated user object to the database
        await user.save();

        // Send a success response
        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        // Handle any errors that occur during the password reset process
        console.error("Error resetting password:", error);
        res.status(500).send("Internal Server Error");
    }
});


export default router;
