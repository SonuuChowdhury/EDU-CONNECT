// This is the footer section schema 

import mongoose from 'mongoose';

const footerinfoSchema = new mongoose.Schema({
  contactMobile:String,
  contackMail:String,
  Xlink:String,
  instagramLink:String,
  linkedinLink:String,
  ytLink:String,
  visitorCount:Number,
  lastUpdated:String
});

export const footerinfo = mongoose.model('footerinfo', footerinfoSchema);
