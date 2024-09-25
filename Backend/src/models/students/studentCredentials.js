import mongoose from 'mongoose';
import connectDB from '../../db/index.js'

const { loginConnection } = await connectDB();

const studentCredentialsSchema = new mongoose.Schema({
  roll: Number,
  password: String
});

const studentcredentials = loginConnection.model('studentcredentials', studentCredentialsSchema); // Corrected model name
export default studentcredentials;
