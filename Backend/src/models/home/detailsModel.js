// This is the details section schema 

import mongoose from 'mongoose';

const detailsSchema = new mongoose.Schema({
  profCount:Number,
  courseCount:Number,
  currentStudentCount:Number,
  alumniCount:Number
});

export const detail = mongoose.model('detail', detailsSchema);
