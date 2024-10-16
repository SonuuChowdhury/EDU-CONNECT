// This is the master area section schema 

import mongoose from 'mongoose';

const masterPhotosSchema = new mongoose.Schema({
  serial:Number,
  link:String,
  title:String
});

export const masterphoto = mongoose.model('masterphoto', masterPhotosSchema);
