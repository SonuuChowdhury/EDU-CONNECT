import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function SendMailForStudentEmailVerification(to, otp) {
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
        subject: 'Email Verification for Academy of Technology',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="color: #0056b3; font-size: 1.8em; text-align: center;">Welcome to the Academy of Technology</h2>

            <p style="font-size: 1.2em;">Dear Student,</p>

            <p style="font-size: 1.2em;">To complete your registration, please verify your email address by entering the One-Time Password (OTP) provided below:</p>

            <h3 style="font-size: 1.5em; color: #0056b3;">Your Verification Code</h3>
            <p style="font-size: 1.8em; font-weight: bold; color: #cc0000; text-align: center; margin: 20px 0;">${otp}</p>

            <p style="font-size: 1.2em;">Enter this OTP on the verification page. It is valid for 5 minutes.</p>

            <p style="font-size: 1.2em; margin-top: 1em;">If you need assistance, contact us at <a href="mailto:chowdhurysonu047@gmail.com" style="color: #0056b3; text-decoration: underline;">chowdhurysonu047@gmail.com</a>.</p>

            <div style="text-align: center; margin-top: 40px;">
                <p style="font-size: 1em; color: #777;">Academy of Technology | Grand Trunk Road, Adisaptagram, India | Phone: +123-456-7890</p>
                <p style="font-size: 1em; color: #777;">This is an automated email, please do not reply.</p>
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
