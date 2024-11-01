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
        subject: '🎉 Welcome to Academy of Technology!',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.8; max-width: 600px; margin: auto; padding: 20px;">
            <h2 style="color: #0056b3; font-size: 1.6em; text-align: center;">🎓 Welcome to the Academy of Technology, ${name}!</h2>

            <p style="font-size: 1.1em; margin-top: 1em;">Dear <strong>${name}</strong>,</p>

            <p style="font-size: 1.1em;">We’re thrilled to have you join the <strong>Academy of Technology</strong> family! 🌟 Your academic journey with us is about to begin, and we’re here to support you every step of the way. Let’s make it a great experience together!</p>

            <h3 style="font-size: 1.2em; color: #0056b3;">🔑 Your Login Details</h3>
            <p>To get started, use the credentials below to access the student portal:</p>
            <ul style="list-style: none; padding: 0; font-size: 1.1em;">
                <li><strong>📌 Roll Number:</strong> <span style="font-weight: bold; color: #333;">${roll}</span></li>
                <li><strong>🔒 Default Password:</strong> <span style="font-weight: bold; color: #cc0000;">password</span></li>
            </ul>

            <p><strong>⚠️ Important:</strong> For your security, please change your password immediately after logging in. Navigate to the “Settings” section of your profile to update it.</p>

            <h3 style="font-size: 1.2em; color: #0056b3;">📅 Next Steps</h3>
            <p>After logging in, you’ll have access to a variety of resources, including:</p>
            <ul style="font-size: 1.1em;">
                <li>🗓️ Your class schedule</li>
                <li>📚 Course materials and resources</li>
                <li>📝 Examination details</li>
                <li>📊 Attendance tracking</li>
                <li>And much more!</li>
            </ul>

            <p>If you have any questions or need assistance, please feel free to reach out to the administration office or visit our helpdesk. We’re here to help!</p>

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
