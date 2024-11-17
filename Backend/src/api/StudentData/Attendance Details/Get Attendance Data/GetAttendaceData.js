import express from 'express';
import studentattendancedetails from '../../../../models/students/studentAttendanceDetails.js';

const GetStudentAttendanceDetails = express.Router();
GetStudentAttendanceDetails.use(express.json());

GetStudentAttendanceDetails.get('/api/student-dashboard/attendance', async (req, res) => {
    const { _id } = req.user;
    const {roll, getAttendance, startMonitoring} = req.query;
    if(!roll){
        return res.status(400).json({data:"Roll Number is required"})
    }

    if(startMonitoring){
        const NewAttendanceMonitoringData = new studentattendancedetails({
            roll:roll,
            subjects:[]
        })
        const NewAttendanceMonitoringDataStatus = await NewAttendanceMonitoringData.save()
        if(!NewAttendanceMonitoringDataStatus){
            return res.status(404).json({msg:"Falied to start Monitoring"})
        }else{
            return res.status(200).json({msg:"Monitoing started succesfully"})
        }
    }

    

    if(getAttendance){
        const studentAttendanceData = await studentattendancedetails.findOne({roll:Number(roll)})
        if(!studentAttendanceData){
            return res.status(404).json({msg:"Attendance data not found"})
        }else{
            return res.status(200).json({data:studentAttendanceData})
        }
    }
});
export default GetStudentAttendanceDetails;









