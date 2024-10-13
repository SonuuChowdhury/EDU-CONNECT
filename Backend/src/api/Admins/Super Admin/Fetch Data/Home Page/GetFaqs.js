import express from 'express';
import { faq } from '../../../../../models/home/faq.js';

const GetFaqs = express.Router();
GetFaqs.use(express.json());

GetFaqs.get('/api/super-admin/faqs', async (req, res) => {
    try{
        const GetFaqsData= await faq.find()
        if(!GetFaqsData){
            res.status(400).json({msg:'No data Found'})
        }
        res.status(200).json(GetFaqsData)
    }catch(error){
        res.status(500).json({msg:'Server Error'})
    }
});                

export default GetFaqs;









