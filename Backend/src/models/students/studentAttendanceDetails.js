import mongoose from 'mongoose';
import connectDB from '../../db/ConnectMongoDB.js'

const { studentDetailsConnection } = await connectDB();

const attendanceSchema = new mongoose.Schema({
    roll: { type: Number, required: true, unique: true },
    subjects: {
      English: {
        startDate: { type: Date, required: true },
        AbsentDates: { type: [Date], default: [] },
        PresentDates: { type: [Date], default: [] },
        LastUpdated: { type: Date, required: true },
        Monitoring: { type: Boolean, default: false }
      },
      Math: {
        startDate: { type: Date, required: true },
        AbsentDates: { type: [Date], default: [] },
        PresentDates: { type: [Date], default: [] },
        LastUpdated: { type: Date, required: true },
        Monitoring: { type: Boolean, default: false }
      }
    }
  })

const studentattendancedetails = studentDetailsConnection.model('studentattendancedetails', attendanceSchema);
export default studentattendancedetails;
