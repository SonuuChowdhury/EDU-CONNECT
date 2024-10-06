import studentcredentials from '../../../models/students/studentCredentials.js';
import GenerateOTP from '../../../../Demo/GenrateOPT.js';
import studentbasicdetails from '../../../models/students/studentDetails.js';
import SendMailForOTP from './SendMailForOTP.js';
import {RedisClient} from '../../../db/ConnectRedis.js';
import obfuscateEmail from '../../../../Demo/obfuscateEmail.js';


import express from 'express';
import jwt from  'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const ForgotPasswordHandeller = express.Router();
ForgotPasswordHandeller.use(express.json());



ForgotPasswordHandeller.post('/login/student/forgot-password', async (req, res) => {
    const { roll ,reqType, otp} = req.body;
    // reqType to be se 0 for inital requests and 1 for verification requests 

    // Roll Number Validation
    if (!roll || isNaN(roll)) {
        return res.status(400).send("Invalid roll number");
    }

    const studentRoll = Number(roll); 

    try {
        // Find student with matching roll
        const StudentCheck = await studentcredentials.findOne({ roll: studentRoll });
        if (!StudentCheck) {
            return res.status(400).send('Student not found');
        }

        if(reqType==0){
            try{
                const GenOTP = GenerateOTP()
                const StudentData = await studentbasicdetails.findOne({roll: studentRoll})
                const StudentEmail = StudentData.email
                const StudentName= StudentData.name
                const StudentRoll= StudentData.roll

                const GeneratedObfuscateEmail = obfuscateEmail(StudentEmail)

                // Push OTP to Redis
                const StudentRollString=String(StudentRoll)
                const StudentGenOTP=String(GenOTP)
                try {
                    await RedisClient.rPush(StudentRollString, StudentGenOTP);
                    await RedisClient.expire(StudentRollString,300);
                } catch (err) {
                    console.error('Unable to store OTP in Redis:', err);
                    return res.status(500).json({ msg: "Unable to Store the OTP in Redis" });
                }

                const MailStatus = await SendMailForOTP(GenOTP,StudentEmail,StudentName)

                if(MailStatus.status==500){
                    return res.status(500).json({msg:"Failed to send the OTP mail."})
                }

                if(MailStatus.status==200){
                    return res.status(200).json({msg:"OTP Sent to user email.",
                        name: StudentName,
                        email: GeneratedObfuscateEmail,
                    })
                }

            }catch(err){
                console.log(err)
                return res.status(500).json({msg:"Internal Server error"})
            }
        }
    }catch (error) {
        return res.status(500).send('Server error');
    }

    if(reqType==1){
        try{
            if (!roll || !otp) {
                return res.status(500).json({msg:"Roll number and OTP are required"})
            }

            const StudentRollString=String(roll)
            
              // Get all OTPs for this roll number from the list
              const otps = await RedisClient.lRange(StudentRollString, 0, -1);

                if (!otps || otps.length === 0) {
                    return res.status(400).json({ msg: "No OTPs found or they expired" });
                }

                // Check if the entered OTP is in the list
                if (otps.includes(String(otp))) {
                    return res.status(200).send('OTP verified successfully');
                } else {
                    return res.status(400).send('Invalid OTP');
                }

            } catch (err) {
                console.log(err);
                return res.status(500).json({ msg: "Internal Server error" });
            }
        }
});

export default ForgotPasswordHandeller;
