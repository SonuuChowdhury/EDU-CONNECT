// This is the event section schema 

import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
    serial:Number,
    photo:String,
    tittle:String,
});

export const facility = mongoose.model('facility', facilitySchema);