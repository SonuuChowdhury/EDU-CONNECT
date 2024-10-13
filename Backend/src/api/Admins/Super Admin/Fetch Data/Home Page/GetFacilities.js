import express from 'express';
import { facility } from '../../../../../models/home/facilityModel.js';

const GetFacilities = express.Router();
GetFacilities.use(express.json());

GetFacilities.get('/api/super-admin/facilities', async (req, res) => {
    try{
        const facilitiesData= await facility.find()
        if(!facilitiesData){
            res.status(400).json({msg:'No data Found'})
        }
        res.status(200).json(facilitiesData)
    }catch(error){
        res.status(500).json({msg:'Server Error'})
    }
});                

export default GetFacilities;









