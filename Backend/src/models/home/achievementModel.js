// This is the achievements section schema 

import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  serial:Number,
  date:String,
  tittle:String,
  photo:String,
  description:String,
  link:String
});

export const achievement = mongoose.model('achievement', achievementSchema);
