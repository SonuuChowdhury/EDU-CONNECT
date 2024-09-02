import express from 'express';

import { masterphotos } from '../models/home/masterPhotosModel.js';
import { notice } from '../models/home/noticemodel.js';
import {event} from '../models/home/eventsmodel.js'
import { achievement } from '../models/home/achievementModel.js';
import { facility } from '../models/home/facilityModel.js';
import { detail } from '../models/home/detailsModel.js';
import { message } from '../models/home/messageModel.js';
import { faq } from '../models/home/faq.js';
import { footer } from '../models/home/footerDataModel.js';

const homeRouter = express.Router();

// APIs are listed here
homeRouter.get('/api/home', async (req, res) => {
    try {
      const masterAreas=await masterphotos.find();
      const notices=await notice.find();
      const events = await event.find();
      const achievements=await achievement.find();
      const facilities=await facility.find();
      const details=await detail.find();
      const messages=await message.find();
      const faqs=await faq.find();
      const footers=await footer.find();

      const responseData = {
        masterAreas,
        notices,
        events,
        achievements,
        facilities,
        details,
        messages,
        faqs,
        footers
      };
      res.json(responseData);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving announcements', error });
    }
  });

  export default homeRouter;