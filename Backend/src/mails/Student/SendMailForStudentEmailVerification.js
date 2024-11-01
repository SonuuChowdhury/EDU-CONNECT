import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function SendMailForStudentEmailVerification(to, name, otp) {
    const user = `${process.env.MAIL_ID}`;
    const pass = `${process.env.MAIL_PASS}`;

    const MailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: user,
            pass: pass,
        },
    });

    const mailOptions = {
        from: `ADMIN AOT INSTITUTE <${process.env.MAIL_ID}>`,
        to: to,
        subject: '🔐 Email Verification for Academy of Technology',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.8; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="color: #0056b3; font-size: 1.6em; text-align: center;">🎓 Welcome to the Academy of Technology, ${name}!</h2>

            <p style="font-size: 1.1em; margin-top: 1em;">Dear <strong>${name}</strong>,</p>

            <p style="font-size: 1.1em;">We’re thrilled to have you join the <strong>Academy of Technology</strong> community! 🎉 To secure your account, please verify your email address using the One-Time Password (OTP) provided below.</p>

            <h3 style="font-size: 1.2em; color: #0056b3;">🔑 Your Verification Code</h3>
            <p style="font-size: 1.5em; font-weight: bold; color: #cc0000; text-align: center; margin: 20px 0;">${otp}</p>

            <p style="font-size: 1.1em;">Please enter this OTP on the verification page to confirm your email address.</p>

            <p style="font-size: 1.1em;"><strong>⏰ Note:</strong> This OTP is valid for only 5 minutes. If it expires, you may request a new one from the login page.</p>

            <h3 style="font-size: 1.2em; color: #0056b3;">💬 Need Assistance?</h3>
            <p style="font-size: 1.1em;">If you have any questions or encounter issues with the verification process, feel free to contact our support team at <a href="mailto:support@aot.edu" style="color: #0056b3; text-decoration: underline;">support@aot.edu</a>. We're here to help! 😊</p>

            <p style="font-size: 1.1em;">Thank you for taking this important step in securing your account. We look forward to supporting you in your academic journey at the Academy of Technology!</p>

            <div style="text-align: center; margin-top: 40px;">
                <p style="font-size: 0.9em; color: #777;">Academy of Technology | Grand Trunk Road, Adisaptagram, India | Phone: +123-456-7890</p>
                <p style="font-size: 0.9em; color: #777;">This is an automated email, please do not reply.</p>
            </div>
        </div>
        `,
    };

    try {
        const info = await MailTransporter.sendMail(mailOptions);
        return { status: 200 };
    } catch (error) {
        console.error(error);
        return { status: 500 };
    }
}
