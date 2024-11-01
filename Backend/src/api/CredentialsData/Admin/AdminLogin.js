import admincredentials from '../../../models/admins/adminlogin.js';
import obfuscateEmail from '../../../../Demo/obfuscateEmail.js';
import GenerateOTP from '../../../../Demo/GenrateOPT.js';
import { RedisClient } from '../../../db/ConnectRedis.js';
import SendMailForOTPAdmin from '../../../mails/Admin/OTPMailForAdmin.js';
import express from 'express';
import jwt from  'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const getAdminCredentials = express.Router();
getAdminCredentials.use(express.json());

getAdminCredentials.post('/login/admin', async (req, res) => {
    const { uid, password,reqType,otp} = req.body;
    // reqType=0 for otp generation and reqType=1 for otp verification 
    // uid Number Validation
    if (!uid || isNaN(uid)) {
        return res.status(400).json({msg:"Invalid uid number"});
    }
    if (!password) {
        return res.status(400).json({msg:"Password is required"});
    }
    if (reqType !== 0 && reqType !== 1) {
        return res.status(400).json({ msg: "Invalid request type, it should be either 0 or 1" });
    }

    const AdminUID = Number(uid); 
    const AdminUIDString=String(AdminUID)

    if(reqType===1){
        try{
            
              // Get all OTPs for this roll number from the list
              const otps = await RedisClient.lRange(AdminUIDString, 0, -1);
                if (!otps || otps.length === 0) {
                    return res.status(404).json({ msg: "No OTPs found or they expired" });
                }
                // Check if the entered OTP is in the list
                if (otps.includes(String(otp))) {
                    const admin = await admincredentials.findOne({ uid: uid })
                    const token = await jwt.sign({_id:admin._id},process.env.JWT_SECRET,{expiresIn:'1h'})
                    await RedisClient.rPush("AdminLoginSessionID", String(admin._id));
                    await RedisClient.expire("AdminLoginSessionID",3600);
                    return res.status(200).json({
                        msg:"OTP verified successfully",
                        token:token
                    });
                } else {
                    return res.status(400).json({msg:"Invalid OPT"});
                }

            } catch (err) {
                console.log(err);
                return res.status(500).json({ msg: "Internal Server error" });
            }
    }

    if(reqType===0){
        try {
            // Find admin with matching uid
            const admin = await admincredentials.findOne({ uid: AdminUID });
            if (!admin) {
                return res.status(404).json({msg:'admin not found'});
            }
            const isMatched = await bcrypt.compare(password,admin.password)
    
            if(!isMatched){
                return res.status(400).send("Invalid Password")
            }
            // Push OTP to Redis
            const GeneratedObfuscateEmail = obfuscateEmail(admin.email)
            const GenOTP=GenerateOTP()

            const AdminGenOTP=String(GenOTP)
            try {
                await RedisClient.rPush(AdminUIDString, AdminGenOTP);
                await RedisClient.expire(AdminUIDString,300);
            } catch (err) {
                console.error('Unable to store OTP in Redis:', err);
                return res.status(500).json({ msg: "Unable to Store the OTP in Redis" });
            }       
            const MailStatus = await SendMailForOTPAdmin(GenOTP,admin.email,admin.role)
    
            if(MailStatus.status==500){
                return res.status(500).json({msg:"Failed to send the OTP mail."})
            }
    
            if(MailStatus.status==200){
                return res.status(200).json({msg:"OTP Sent to user email.",
                    role: admin.role,
                    email: GeneratedObfuscateEmail,
                })
            }
    
        } catch (error) {
            return res.status(500).json({msg:`error while login: ${error}`})
        }

    }

    
});

export default getAdminCredentials;
