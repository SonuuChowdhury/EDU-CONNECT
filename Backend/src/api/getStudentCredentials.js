import studentcredentials from '../models/students/studentCredentials.js'; // Fixed typo in path
import express from 'express';

const getStudentCredentials = express.Router();

getStudentCredentials.use(express.json());

getStudentCredentials.post('/login/student', async (req, res) => {
    const { roll } = req.body;

    // Ensure roll is a valid number
    if (!roll || isNaN(roll)) {
        console.log("Invalid roll number");
        return res.status(400).send("Invalid roll number");
    }

    const studentRoll = Number(roll); // Convert roll to a number after validation
    console.log(studentRoll);

    try {
        // Find student with matching roll
        const student = await studentcredentials.findOne({ roll: studentRoll });
        const trymain=await studentcredentials.find()
        console.log(trymain)
        if (!student) {
            console.log("Student not found");
            return res.status(404).send('Student not found');
        } else {
            console.log("Student found");
            return res.status(200).send('Student found');
        }
    } catch (error) {
        console.log("Error fetching student", error);
        return res.status(500).send('Server error');
    }
});

export default getStudentCredentials;
