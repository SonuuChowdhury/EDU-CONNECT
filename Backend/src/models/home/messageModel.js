// This is the message section schema 

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    serial:Number,
    photo:String,
    tittle:String,
    name:String,
    description:String,
});

export const message = mongoose.model('message', messageSchema);