// This is the feedback section schema 

import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  date:String,
  mail:String,
  message:String
});

export const feedback = mongoose.model('feedback', feedbackSchema);
