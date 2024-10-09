import mongoose from 'mongoose';
import connectDB from '../../db/ConnectMongoDB.js';

const { loginConnection } = await connectDB();


const adminCredentialsSchema = new mongoose.Schema({
  role:String,
  uid:Number,
  password:String,
  email:String
});

const admincredentials = loginConnection.model('admincredentials', adminCredentialsSchema); 
export default admincredentials;


