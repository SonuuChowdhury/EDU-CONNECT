import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export default async function SendMailForStudentEmailVerification(to, name,otp) {
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
        subject: 'Welcome to Academy of Technology!',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ccc; border-radius: 10px; padding: 20px;">
    <div style="text-align: center;">
        <h2 style="color: #0066cc;">Welcome to the Academy of Technology, ${name}!</h2>
    </div>

    <p>Dear <strong>${name}</strong>,</p>

    <p>We are excited to have you join the <strong>Academy of Technology</strong> community! To ensure the security of your account, please verify your email address using the One-Time Password (OTP) provided below.</p>

    <h3 style="color: #0066cc;">Your Verification Code</h3>
    <p style="font-size: 1.2em; font-weight: bold; color: #cc0000; text-align: center;">${otp}</p>
    <p>Please enter this OTP on the verification page to confirm your email address.</p>

    <p><strong>Note:</strong> This OTP is valid for only 5 minutes. If it expires, you may request a new one from the login page.</p>

    <h3 style="color: #0066cc;">Need Assistance?</h3>
    <p>If you have any questions or encounter issues with the verification process, feel free to contact our support team at <a href="mailto:support@aot.edu">support@aot.edu</a>. We're here to help!</p>

    <p>Thank you for taking this important step in securing your account. We look forward to supporting you in your academic journey at the Academy of Technology!</p>

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
