import express from 'express';
import { notice } from '../../../../../models/home/noticemodel.js';

const GetNotices = express.Router();
GetNotices.use(express.json());

GetNotices.get('/api/super-admin/notices', async (req, res) => {
    try{
        const NoticesData= await notice.find()
        if(!NoticesData){
            res.status(400).json({msg:'No data Found'})
        }
        res.status(200).json(NoticesData)
    }catch(error){
        res.status(500).json({msg:'Server Error'})
    }
});

export default GetNotices;









