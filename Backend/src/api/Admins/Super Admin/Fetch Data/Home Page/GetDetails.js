import express from 'express';
import { detail } from '../../../../../models/home/detailsModel.js';
const GetDetails = express.Router();
GetDetails.use(express.json());

GetDetails.get('/api/super-admin/details', async (req, res) => {
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


export default GetDetails;









