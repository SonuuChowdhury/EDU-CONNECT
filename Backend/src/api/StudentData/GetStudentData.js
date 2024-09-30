import express from 'express';
import studentbasicdetails from "../../models/students/studentDetails.js";
import studentcredentials from '../../models/students/studentCredentials.js';

const GetStudentDeatils = express.Router();
GetStudentDeatils.use(express.json());

GetStudentDeatils.get('/api/student-dashboard', async (req, res) => {
    const { _id } = req.user;
    try{
        const student= await studentcredentials.findOne({ _id: _id })
        if(!student){
            res.status(400).json({msg:'Not Found'})
        }
        const {roll}=student;
        const data=await studentbasicdetails.findOne({roll:roll})
        res.status(200).json(data)
    }catch(error){
        res.status(500).json({msg:'Server Error'})
    }
});

export default GetStudentDeatils;









