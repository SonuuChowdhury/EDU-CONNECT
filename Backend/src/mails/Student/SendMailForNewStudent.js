import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

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
        subject: 'Welcome to Academy of Technology!',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ccc; border-radius: 10px; padding: 20px;">
            <div style="text-align: center;">
                <h2 style="color: #0066cc;">Welcome to the Academy of Technology, ${name}!</h2>
            </div>

            <p>Dear <strong>${name}</strong>,</p>

            <p>We are delighted to welcome you to the <strong>Academy of Technology</strong>. Your academic journey with us begins now, and we are here to support you every step of the way.</p>

            <h3 style="color: #0066cc;">Your Login Details</h3>
            <p>Here are your login credentials for accessing the student portal:</p>

            <ul style="list-style-type: none; padding: 0;">
                <li><strong>Roll Number:</strong> ${roll}</li>
                <li><strong>Default Password:</strong> <span style="color: #cc0000;">password</span></li>
            </ul>

            <p><strong>Important:</strong> For security purposes, please change your password immediately after logging in. You can do this by navigating to the “Settings” section of your profile.</p>

            <h3 style="color: #0066cc;">Next Steps</h3>
            <p>Once logged in, you will have access to your academic dashboard, which includes:</p>
            <ul>
                <li>Your class schedule</li>
                <li>Course materials and resources</li>
                <li>Examination details</li>
                <li>Attendance tracking</li>
                <li>And much more!</li>
            </ul>

            <p>If you have any questions or need further assistance, please do not hesitate to contact the administration office or visit our helpdesk.</p>

            <p>We look forward to seeing you excel in your studies and make the most of the opportunities here at the Academy of Technology.</p>

            <div style="text-align: center; margin-top: 40px;">
                <p style="font-size: 0.9em; color: #777;">Academy of Technology | Grand trunk road, Adisaptagram, India | Phone: +123-456-7890</p>
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
