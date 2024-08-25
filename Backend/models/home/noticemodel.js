// This is the notice section schema 

import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  serial:Number,
  date:String,
  tittle:String,
  description:String,
  link:String
});

export const notice = mongoose.model('notice', noticeSchema);
