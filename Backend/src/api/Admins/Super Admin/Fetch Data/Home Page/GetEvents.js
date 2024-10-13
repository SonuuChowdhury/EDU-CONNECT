import express from 'express';
import { event } from '../../../../../models/home/eventsmodel.js';

const GetEvent = express.Router();
GetEvent.use(express.json());

GetEvent.get('/api/super-admin/events', async (req, res) => {
    try{
        const EventsData= await event.find()
        if(!EventsData){
            res.status(400).json({msg:'No data Found'})
        }
        res.status(200).json(EventsData)
    }catch(error){
        res.status(500).json({msg:'Server Error'})
    }
});

export default GetEvent;









