import express from 'express';
import { detail } from '../../../../../models/home/detailsModel.js';
const GetFacultyDetails = express.Router();
GetFacultyDetails.use(express.json());

GetFacultyDetails.get('/api/super-admin/faculty-details', async (req, res) => {
    try{
        const GetFacultyDetailsData= await detail.find()
        if(!GetFacultyDetailsData){
            res.status(400).json({msg:'No data Found'})
        }
        res.status(200).json(GetFacultyDetailsData)
    }catch(error){
        res.status(500).json({msg:'Server Error'})
    }
});                

export default GetFacultyDetails;









