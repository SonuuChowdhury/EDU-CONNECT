import studentcredentials from '../../models/students/studentCredentials.js'; 
import GetStudentDeatils from '../StudentData/GetStudentData.js';
import express from 'express';

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
        if (!student) {
            return res.status(404).send('Student not found');
        } else {
            // Password Validation logic 
            if(student.password!=password){
                return res.status(400).send("Invalid Password")
            }
            const StudentBasicDetails=await GetStudentDeatils({studentRoll});
            return res.status(200).send(StudentBasicDetails);
        }
    } catch (error) {
        return res.status(500).send('Server error');
    }
});

export default getStudentCredentials;
