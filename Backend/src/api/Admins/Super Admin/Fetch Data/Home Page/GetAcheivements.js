import express from 'express';
import { achievement } from '../../../../../models/home/achievementModel.js';

const GetAcheivements = express.Router();
GetAcheivements.use(express.json());

GetAcheivements.get('/api/super-admin/achievements', async (req, res) => {
    try{
        const achievementData= await achievement.find()
        if(!achievementData){
            res.status(400).json({msg:'No data Found'})
        }
        res.status(200).json(achievementData)
    }catch(error){
        res.status(500).json({msg:'Server Error'})
    }
});                

export default GetAcheivements;









