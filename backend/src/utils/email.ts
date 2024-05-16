import nodemailer from 'nodemailer';

// Function to send password reset email
export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<void> => {

  // Create a test account to use for sending emails.
  const testAccount = await nodemailer.createTestAccount();

  // Create a nodemailer transporter with your email service provider configuration
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'rosario.leffler28@ethereal.email',
      pass: 'v5Hg7mUAZrwuNe1wYF'
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
