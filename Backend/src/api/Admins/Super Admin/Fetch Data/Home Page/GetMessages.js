import express from 'express';
import { message } from '../../../../../models/home/messageModel.js';

const GetMessages = express.Router();
GetMessages.use(express.json());

GetMessages.get('/api/super-admin/messages', async (req, res) => {
    try{
        const GetMessagesData= await message.find()
        if(!GetMessagesData){
            res.status(400).json({msg:'No data Found'})
        }
        res.status(200).json(GetMessagesData)
    }catch(error){
        res.status(500).json({msg:'Server Error'})
    }
});                

export default GetMessages;









