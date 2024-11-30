import studentcredentials from '../../../models/students/studentCredentials.js';
import studentbasicdetails from '../../../models/students/studentDetails.js';
import express from 'express';
import jwt from  'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const getStudentCredentials = express.Router();
getStudentCredentials.use(express.json());

getStudentCredentials.post('/login/student', async (req, res) => {
    const { roll, password } = req.body;

    // Roll Number Validation
    if (!roll || isNaN(roll)) {
        return res.status(400).send("Invalid roll number");
    }

    const studentRoll = Number(roll); 

    try {
        // Find student with matching roll
        const student = await studentcredentials.findOne({ roll: studentRoll });
        const StudentDetails = await studentbasicdetails.findOne({ roll: studentRoll });
        if (!student) {
            return res.status(404).send('Student not found');
        }
        const isMatched = bcrypt.compare(password,student.password)

        if(!isMatched){
            return res.status(400).send("Invalid Password")
        }

        StudentDetails.lastLogin = new Date();
        await student.save();
        
        const token = jwt.sign({_id:student._id, roll:studentRoll},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({token})
    
    } catch (error) {
        return res.status(500).send('Server error');
    }
});

export default getStudentCredentials;
