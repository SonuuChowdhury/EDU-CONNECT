import mongoose from 'mongoose';
import connectDB from '../../db/index.js'

const { studentDetailsConnection } = await connectDB();

const studentDetailsSchema = new mongoose.Schema({
  roll: Number,
  name:String,
  profile: {type: String, unique: true },
  department:String,
  year:Number,
  semester:Number,
  email: {type: String, unique: true },
  mobile:{type: Number, unique: true },
  address:String,
});

const studentbasicdetails = studentDetailsConnection.model('studentbasicdetails', studentDetailsSchema);
export default studentbasicdetails;
