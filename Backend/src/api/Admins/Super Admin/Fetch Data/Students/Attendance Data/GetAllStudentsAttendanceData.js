import express from 'express';
import studentAttendanceDetails from '../../../../../../models/students/studentAttendanceDetails.js';
import studentbasicdetails from '../../../../../../models/students/studentDetails.js';

const GetAllStudentsAttendanceData = express.Router();
GetAllStudentsAttendanceData.use(express.json());

GetAllStudentsAttendanceData.post('/api/super-admin/students-attendance', async (req, res) => {
    try {
      // Get current date for comparison
      const currentDate = new Date();
      const todayStart = new Date(currentDate);
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date(currentDate);
      todayEnd.setHours(23, 59, 59, 999);
  
      // Fetch all attendance records and student details
      const [attendanceRecords, students] = await Promise.all([
        studentAttendanceDetails.find().lean(),
        studentbasicdetails.find().lean()
      ]);
  
      // Create student map for quick lookup
      const studentMap = new Map(students.map(student => [student.roll, student]));
  
      // Process attendance data
      const processedData = attendanceRecords.map(attendance => {
        const student = studentMap.get(attendance.roll);
        if (!student) return null;
  
        let updatedToday = false;
        const subjects = attendance.subjects.map(subject => {
          // Check if subject was updated today
          const lastUpdated = new Date(subject.LastUpdated);
          const isUpdatedToday = lastUpdated >= todayStart && lastUpdated <= todayEnd;
          if (isUpdatedToday) updatedToday = true;
  
          return {
            name: subject.name,
            TotalPresent: subject.TotalPresent || 0,
            TotalAbsent: subject.TotalAbsent || 0,
            subjectType: subject.subjectType
          };
        });
  
        return {
          roll: attendance.roll,
          name: student.name,
          profile: student.profile,
          isProfile: student.isProfile,
          semester: student.semester,
          year: student.year,
          department: student.department,
          attendance: subjects,
          updatedToday
        };
      }).filter(Boolean);
  
      res.status(200).json({
        success: true,
        count: processedData.length,
        data: processedData
      });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  });
  

export default GetAllStudentsAttendanceData;
