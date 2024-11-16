import express from 'express';
import studentattendancedetails from '../../../../models/students/studentAttendanceDetails.js';

const GetStudentAttendanceDetails = express.Router();
GetStudentAttendanceDetails.use(express.json());

GetStudentAttendanceDetails.get('/api/student-dashboard/attendance', async (req, res) => {
    const { _id } = req.user;
    const {roll, getAttendance} = req.body;
    if(!roll){
        return res.status(404).json({data:"Roll Number is required"})
    }
    if(getAttendance){
        const studentAttendanceData = await studentattendancedetails.findOne({roll:Number(roll)})
        return res.status(200).json({data:studentAttendanceData})
    }
});
export default GetStudentAttendanceDetails;









