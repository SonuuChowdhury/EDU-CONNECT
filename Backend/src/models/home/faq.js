// This is the event section schema 

import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    serial:Number,
    question:String,
    answer:String,
    date:String,

});

export const faq = mongoose.model('faq', faqSchema);