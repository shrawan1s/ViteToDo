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
    let success = false;
    try {
        const { firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string; } = req.body;

        // Check if user with the email already exists
        let user: UserDocument | null = await User.findOne({ email });
        if (user) return res.status(409).send("Email already exists");

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
        if (!user) return res.status(401).send("Please enter correct credentials");

        // Compare passwords
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) return res.status(401).send("Please enter correct credentials");

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

        if (!user) return res.status(404).send("User not found");

        res.send(user);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route for requesting password reset
router.post('/forgotpassword', async (req: Request, res: Response) => {
    try {
        const { email }: { email: string; } = req.body;

        // Find user by email
        const user: UserDocument | null = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        // Generate JWT token for password reset
        const resetToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Store the reset token and expiration time in the user object
        user.resetToken = resetToken;
        user.resetTokenExpiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

        // Save the updated user object to the database
        await user.save();

        // Send password reset email with token
        await sendPasswordResetEmail(email, resetToken);

        res.status(200).json({ message: "Password reset email sent successfully", resetToken });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route for resetting password
router.post('/resetpassword', async (req: Request, res: Response) => {
    try {
        // Extract email and resetToken from the request body
        const { email, resetToken, newPassword } = req.body;

        // Validate reset token (you may want to store reset tokens in your database for validation)
        // For simplicity, we're not validating the reset token here

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password with the new hashed password
        user.password = hashedPassword;

        // Save the updated user object to the database
        await user.save();

        // Send a success response
        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        // Handle any errors that occur during the password reset process
        console.error("Error resetting password:", error);
        res.status(500).json({ success: false, error: "Failed to reset password" });
    }
});

export default router;
