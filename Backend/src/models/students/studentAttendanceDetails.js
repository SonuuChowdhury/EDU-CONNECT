import  mongoose  from 'mongoose';
import connectDB from '../../db/ConnectMongoDB.js'

const { studentDetailsConnection } = await connectDB();

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Subject name
  startDate: { type: Date, required: true, default: Date.now}, // Date monitoring started
  AbsentDates: { type: [Date], default: [] }, // Array of absent dates
  PresentDates: { type: [Date], default: [] }, // Array of present dates
  LastUpdated: { type: Date, default: Date.now }, // Last update time
  Monitoring: { type: Boolean, default: true } // Whether monitoring is active
});

const attendanceSchema = new mongoose.Schema({
  roll: { type: Number, required: true, unique: true },
  subjects: { type: [subjectSchema], default: [] } // List of subjects
});

const studentAttendanceDetails = studentDetailsConnection.model('studentAttendanceDetails', attendanceSchema);
export default studentAttendanceDetails;
