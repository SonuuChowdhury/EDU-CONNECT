// This is the footer section schema 

import mongoose from 'mongoose';

const footerSchema = new mongoose.Schema({
  contactMobile:String,
  contackMail:String,
  Xlink:String,
  instagramLink:String,
  linkedinLink:String,
  ytLink:String,
  vsitorCount:Number,
  lastUpdated:String
});

export const footer = mongoose.model('footer', footerSchema);
