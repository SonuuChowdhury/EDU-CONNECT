import mongoose from 'mongoose';
import connectDB from '../../db/ConnectMongoDB.js'

const { studentDetailsConnection } = await connectDB();

const studentDetailsSchema = new mongoose.Schema({
  roll: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, required: true, unique: true },
  department: { type: String, required: true },
  year: { type: Number, required: true },
  semester: { type: Number, required: true },
  address: { type: String, required: true },
  isProfile: { type: Boolean, default: false },
  profile: { type: String, default: null }
});


const studentbasicdetails = studentDetailsConnection.model('studentbasicdetails', studentDetailsSchema);
export default studentbasicdetails;
