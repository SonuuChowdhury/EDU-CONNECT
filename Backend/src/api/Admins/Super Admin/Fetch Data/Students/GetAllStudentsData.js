import express from 'express';
import studentbasicdetails from '../../../../../models/students/studentDetails.js';

const GetAllStudentDeatils = express.Router();
GetAllStudentDeatils.use(express.json());

GetAllStudentDeatils.get('/api/super-admin/students', async (req, res) => {
    try{
        const StudentsData= await studentbasicdetails.find()
        if(!StudentsData){
            res.status(400).json({msg:'No data Found'})
        }
        res.status(200).json(StudentsData)
    }catch(error){
        res.status(500).json({msg:'Server Error'})
    }
});                

export default GetAllStudentDeatils;









