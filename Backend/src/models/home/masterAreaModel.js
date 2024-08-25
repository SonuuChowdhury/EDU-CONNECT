// This is the master area section schema 

import mongoose from 'mongoose';

const masterAreaSchema = new mongoose.Schema({
  serial:Number,
  link:String,
  tittle:String
});

export const masterArea = mongoose.model('masterArea', masterAreaSchema);
