// This is the details section schema 

import mongoose from 'mongoose';

const detailsSchema = new mongoose.Schema({
  backgroundPhoto:String,
  profCount:Number,
  courseCount:Number,
  currentStudentCount:Number,
  alumniCount:Number
});

export const detail = mongoose.model('detail', detailsSchema);
