// This is the master area section schema 

import mongoose from 'mongoose';

const masterPhotosSchema = new mongoose.Schema({
  serial:Number,
  link:String,
  tittle:String
});

export const masterphotos = mongoose.model('masterphotos', masterPhotosSchema);
