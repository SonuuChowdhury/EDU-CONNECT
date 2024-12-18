import express from "express";

import studentbasicdetails from "../../../../../../models/students/studentDetails.js";
import studentcredentials from "../../../../../../models/students/studentCredentials.js";

import HashPassword from "../../../../../../../Demo/PasswordConverter.js";
import GenerateOTP from "../../../../../../../Demo/GenrateOPT.js";

import SendMailForNewStudent from "../../../../../../mails/Student/SendMailForNewStudent.js";
import SendMailForStudentEmailVerification from "../../../../../../mails/Student/SendMailForStudentEmailVerification.js";

import { RedisClient } from "../../../../../../db/ConnectRedis.js";

const signUpStudent = express.Router();
signUpStudent.use(express.json());

signUpStudent.put("/signup/student", async (req, res) => {
    const { verifyEmail ,verifyOTP ,otp,roll, name, department, semester, year, email, mobile, address } = req.body;

    try {
        if(verifyEmail){
            const MaillExist = await studentbasicdetails.findOne({email:email});
            if(MaillExist){
                return res.status(400).json({msg:"Mail Already Exists!"})
            }

            const GenOtp = await GenerateOTP()
            const mailStatus = await SendMailForStudentEmailVerification(email,GenOtp);
            if(mailStatus.status==200){
                const GenOTPString = String(GenOtp)
                await RedisClient.rPush("StudentEmailVerificationOTPs", GenOTPString);
                await RedisClient.expire("StudentEmailVerificationOTPs",300);
                return res.status(200).json({msg:"Mail Sent Succesfully!"})
            }else{
                return res.status(400).json({msg:"Something Went wrong"})
            }
        }

        if(verifyOTP){
            const otps = await RedisClient.lRange("StudentEmailVerificationOTPs", 0, -1);

            if (!otps || otps.length === 0) {
                return res.status(404).json({ msg: "Session Expired !" });
            }

            if (otps.includes(String(otp))) {
                await RedisClient.rPush("StudentEmailVerificationEmails", email);
                await RedisClient.expire("StudentEmailVerificationEmails",300);
                return res.status(200).json({msg:"OTP Verified Succesfully!"})
            } else {
                return res.status(400).json({ msg: 'Invalid OTP' });
            }
        }

        if (!roll || !name || !department || !semester || !year || !email || !mobile || !address) {
            return res.status(400).json({ msg: "All Data is Required" });
        } else {

            const StudentExist = await studentcredentials.findOne({roll:roll});
            if(StudentExist){
                return res.status(400).json({msg:"Student Already Exists!"})
            }

            const MobileExist = await studentbasicdetails.findOne({mobile:mobile});
            if(MobileExist){
                return res.status(400).json({msg:"Mobile Already Exists!"})
            }

            const EmailVeried = await RedisClient.lRange("StudentEmailVerificationEmails", 0, -1);
            if (EmailVeried.includes(String(email))) {
                const DefaultPass = await HashPassword("password");

                const newStudentCredentials = new studentcredentials({
                    roll: roll,
                    password: DefaultPass // Default password
                });

                const newStudentBasicDetails = new studentbasicdetails({
                    roll: roll,
                    name: name,
                    isProfile: false,
                    profile: null,
                    department: department,
                    year: year,
                    semester: semester,
                    email: email,
                    mobile: mobile,
                    address: address,
                    lastLogin: null,
                    joined: new Date()
                });

                    try {
                    // Save the student credentials and basic details
                    const savedStudentCredentials = await newStudentCredentials.save();
                    let savedStudentDetails = false;

                    savedStudentCredentials? savedStudentDetails = await newStudentBasicDetails.save(): null;

                    if (savedStudentCredentials && savedStudentDetails) {
                        await SendMailForNewStudent(email, name, roll);
                        const student = await studentcredentials.findOne({ roll: roll });
                        const token = jwt.sign({_id:student._id, roll:roll},process.env.JWT_SECRET,{expiresIn:'1h'})
                        res.status(200).json({ 
                            msg: "Student Added Successfully",
                            token
                         });
                    } else {
                        res.status(400).json({ msg: "Student cannot be Added" });
                    }
                } catch (error) {
                    console.log(error);
                    res.status(400).json({ msg: "Student cannot be Added" });
                }
            } else {
                return res.status(400).json({msg:"Email Not Verified"});
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

export default signUpStudent;
