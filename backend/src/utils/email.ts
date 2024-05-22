import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Function to send password reset email
export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<void> => {
  // Create a nodemailer transporter with your email service provider configuration
  const transporter = nodemailer.createTransport({
    host: process.env.PROVIDER_HOST,
    port: 587,
    auth: {
      user: process.env.USER_NAME as string,
      pass: process.env.PASS_WORD as string
    }
  });

  try {
    // Send email
    await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // Sender address
      to: email, // Recipient address
      subject: 'Password Reset', // Email subject
      html: `<p>Click <a href="http://localhost:5173/resetpassword/${resetToken}">here</a> to reset your password.</p>`, // Email body with reset link
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send reset password email');
  }
};
