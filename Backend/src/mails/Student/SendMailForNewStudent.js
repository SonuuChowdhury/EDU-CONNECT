import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function SendMailForNewStudent(to, name, roll) {
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
        subject: 'Welcome to Academy of Technology',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="color: #0056b3; font-size: 1.8em; text-align: center;">Welcome to Academy of Technology, ${name}</h2>

            <p style="font-size: 1.2em;">Dear ${name},</p>

            <p style="font-size: 1.2em;">We are excited to have you join the Academy of Technology community. Your academic journey with us is about to begin, and we are here to support you every step of the way.</p>

            <h3 style="font-size: 1.4em; color: #0056b3;">Your Login Details</h3>
            <p style="font-size: 1.2em;">Use the credentials below to access the student portal:</p>
            <ul style="list-style: none; padding: 0; font-size: 1.2em;">
                <li><strong>Roll Number:</strong> <span style="font-weight: bold; color: #333;">${roll}</span></li>
                <li><strong>Default Password:</strong> <span style="font-weight: bold; color: #cc0000;">password</span></li>
            </ul>

            <p style="font-size: 1.2em;">For security, please change your password immediately after logging in by using the "Change Password" option available on your profile page.</p>

            <h3 style="font-size: 1.4em; color: #0056b3;">Login to Your Account</h3>
            <p style="font-size: 1.2em;">To access the student portal and complete your profile, please log in using the following link:</p>
            <p style="text-align: center; font-size: 1.2em; margin: 20px 0;">
                <a href="https://aoteduproject.vercel.app/login" style="color: #0056b3; text-decoration: underline;">https://aoteduproject.vercel.app/login</a>
            </p>

            <div style="text-align: center; margin-top: 40px;">
                <p style="font-size: 1em; color: #777;">Academy of Technology | Grand Trunk Road, Adisaptagram, India | Phone: +123-456-7890</p>
                <p style="font-size: 1em; color: #777;">This is an automated email; please do not reply.</p>
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
