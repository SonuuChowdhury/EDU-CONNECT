import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export default async function SendNotice(to,subject, ByName, ByPosition, content) {
    const user = `${process.env.MAIL_ID}`;
    const pass = `${process.env.MAIL_PASS}`;

    // Get current date and time in IST
    const now = new Date();

    // Format time in 12-hour format with AM/PM
    const time = now.toLocaleTimeString("en-US", { 
        timeZone: "Asia/Kolkata", // Indian timezone (IST)
        hour: "2-digit", 
        minute: "2-digit", 
        hour12: true 
    });

    // Format date as "DD Mon YYYY"
    const date = now.toLocaleDateString("en-GB", { 
        timeZone: "Asia/Kolkata", 
        day: "2-digit", 
        month: "short", 
        year: "numeric" 
    });

    // Combine both
    const dateAndTime = `${time}, ${date}`;

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
        subject: `${subject}`,
        html: `
            <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px; max-width: 600px; margin: auto; background-color: #f9f9f9; border-radius: 8px;">
                <h2 style="text-align: center; color: #333;">AOT Institute Official Notice</h2>
                <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;" />
                
                <p style="font-size: 16px; color: #555;">
                    <strong>Date and Time:</strong> ${dateAndTime}
                </p>
                
                <p style="font-size: 16px; color: #555;">
                    <strong>Subject:</strong> Notice for ${subject} 
                </p>

                <p style="font-size: 16px; color: #555; line-height: 1.6;">
                    ${content}
                </p>

                <p style="font-size: 16px; color: #555; line-height: 1.6;">
                    Regards,<br>
                    <strong>${ByName}</strong><br>
                    ${ByPosition}<br>
                    AOT Institute
                </p>
                
                <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;" />

                <p style="font-size: 14px; color: #999; text-align: center;">
                    This is an automatically generated email. Please do not reply to this email.
                </p>
            </div>
        `,
    };

    try {
        const info = await MailTransporter.sendMail(mailOptions);
        return { status: 200, info };
    } catch (error) {
        console.error(error);
        return { status: 500, error };
    }
}
