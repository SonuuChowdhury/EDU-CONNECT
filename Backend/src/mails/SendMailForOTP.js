import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export default async function SendMailForOTP(otp,to,name){
    const user=`${process.env.MAIL_ID}`
    const pass=`${process.env.MAIL_PASS}`

    const MailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: user,
          pass: pass,
        },
      });

      const mailOptions = {
        from: `ADMIN AOT INSTITUTE <${process.env.MAIL_ID}>` ,
        to: to, 
        subject: 'OTP FOR PASSWORD RESET',
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4CAF50;">Hello ${name},</h2>
        
        <p style="font-size: 16px;">
          You have requested to reset your password. Please use the following One-Time Password (OTP) to proceed:
        </p>

        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 24px; font-weight: bold; color: #FF0000;">${otp}</span>
        </div>

        <p style="font-size: 16px;">
          <strong>Note:</strong> This OTP is valid for <strong>5 minutes</strong>. Do not share this OTP with anyone. If you didn’t request this, you can ignore this email.
        </p>

        <p style="font-size: 16px;">
          For your security, please keep this information confidential. If you face any issues, feel free to reach out to our support team.
        </p>

        <p style="font-size: 16px;">Best Regards,<br/><strong>Admin Team, AOT Institute</strong></p>

        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #666;">
          If you have any concerns, please contact us at ${user}.
        </p>
      </div>`, 
    };
    
    try {
      const info = await MailTransporter.sendMail(mailOptions);
      return { status: 200 };
  } catch (error) {
      return { status: 500 };
  }
}


