import express from 'express';
import { footerinfo } from '../../../../../models/home/footerDataModel.js';

const GetFooterInfo = express.Router();
GetFooterInfo.use(express.json());

GetFooterInfo.get('/api/super-admin/footer-info', async (req, res) => {
    try{
        const GetFooterInfoData= await footerinfo.find()
        if(!GetFooterInfoData){
            res.status(400).json({msg:'No data Found'})
        }
        res.status(200).json(GetFooterInfoData)
    }catch(error){
        res.status(500).json({msg:'Server Error'})
    }
});                

export default GetFooterInfo;









