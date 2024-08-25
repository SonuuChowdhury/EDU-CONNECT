// This is the event section schema 

import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    serial:Number,
    photo:String,
    tittle:String,
    description:String,
    link:String,
    date:String

});

export const event = mongoose.model('event', eventSchema);
