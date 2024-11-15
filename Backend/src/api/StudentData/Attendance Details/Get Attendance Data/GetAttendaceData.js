import express from 'express';
import studentattendancedetails from '../../../../models/students/studentAttendanceDetails';

const GetStudentAttendanceDetails = express.Router();
GetStudentAttendanceDetails.use(express.json());

GetStudentAttendanceDetails.get('/api/student-dashboard/attendance', async (req, res) => {
    const { _id } = req.user;
    const {roll} = req.body;

    const studentAttendanceData = await studentattendancedetails.find({roll:roll})
    res.status(200).json({data:studentAttendanceData})


});

export default GetStudentAttendanceDetails;









