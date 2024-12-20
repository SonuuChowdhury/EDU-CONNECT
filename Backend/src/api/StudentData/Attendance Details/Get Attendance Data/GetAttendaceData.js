import express from 'express';
import studentattendancedetails from '../../../../models/students/studentAttendanceDetails.js';

const GetStudentAttendanceDetails = express.Router();
GetStudentAttendanceDetails.use(express.json());

GetStudentAttendanceDetails.post('/api/student-dashboard/attendance', async (req, res) => {
  const {
    roll,
    getAttendance,
    startMonitoring,
    addSubject,
    NewTotalPresent,
    NewTotalAbsent,
    deleteSubject,
    subjectName,
    subjectType,
    updateAttendance,
    markPresent,
    markAbsent,
    removeMark,
    editData,
    currentSubjectName,
    newSubjectType,
    newSubjectName,
    isAttendanceDataChanged
  } = req.body;

  if (!roll) {
    return res.status(400).json({ data: "Roll Number is required" });
  }

  // Start Monitoring
  if (startMonitoring) {
    const NewAttendanceMonitoringData = new studentattendancedetails({
      roll: roll,
      subjects: [],
    });
    const NewAttendanceMonitoringDataStatus = await NewAttendanceMonitoringData.save();
    if (!NewAttendanceMonitoringDataStatus) {
      return res.status(400).json({ msg: "Failed to start Monitoring" });
    } else {
      return res.status(200).json({ msg: "Monitoring started successfully" });
    }
  }



// Editing Data 
  if (editData) {
    // Validate input
    if (!newSubjectName || !newSubjectType || !currentSubjectName) {
      return res.status(400).json({
        message: "Please provide Current Subject Name, New Subject Name, and New Subject Type.",
      });
    }

    // Check if the subject already exists
    const subjectExists = student.subjects.some((subject) => subject.name === newSubjectName);
    if (subjectExists) {
      return res.status(400).json({ msg: "Subject already exists." });
    }
  
    try {
      const updateQuery = { roll, "subjects.name": currentSubjectName }; // Match roll and current subject name
      let updateFields = {
        "subjects.$.name": newSubjectName, // Update the subject name
        "subjects.$.subjectType": newSubjectType, // Update the subject type
        "subjects.$.LastUpdated": new Date(), // Update the last updated timestamp
      };

      // Validate NewTotalPresent and NewTotalAbsent
    if (NewTotalPresent < 0 || isNaN(NewTotalPresent)) {
      return res.status(400).json({ msg: "Invalid Attendance value. It cannot be negative or invalid." });
    }
    if (NewTotalAbsent < 0 || isNaN(NewTotalAbsent)) {
      return res.status(400).json({ msg: "Invalid Attendance value. It cannot be negative or invalid." });
    }
  
      if (isAttendanceDataChanged) {
        // Clear PresentDates and AbsentDates, and update totals
        updateFields = {
          ...updateFields,
          "subjects.$.PresentDates": [], // Clear PresentDates
          "subjects.$.AbsentDates": [], // Clear AbsentDates
          "subjects.$.TotalPresent": NewTotalPresent, // Update TotalPresent
          "subjects.$.TotalAbsent": NewTotalAbsent, // Update TotalAbsent
        };
      }
      
      // Perform the update
      const updatedAttendance = await studentattendancedetails.findOneAndUpdate(
        updateQuery, // Query
        { $set: updateFields }, // Fields to update
        { new: true } // Return the updated document
      );
  
      if (!updatedAttendance) {
        return res.status(404).json({ message: "Subject not found or unable to update." });
      }
  
      return res.status(200).json({
        message: "Subject updated successfully.",
        updatedAttendance,
      });
    } catch (error) {
      console.error("Error updating subject:", error);
      return res.status(500).json({ message: "An error occurred while updating the subject." });
    }
  }
  
 // Update Attendance
if (updateAttendance) {
  try {
    // Find the student by roll
    const attendanceData = await studentattendancedetails.findOne({ roll: Number(roll) });

    if (!attendanceData) {
      return res.status(404).json({ msg: "No student found with this roll number" });
    }

    if (!subjectName) {
      return res.status(400).json({ msg: "Subject Name is required" });
    }

    const subject = attendanceData.subjects.find((subj) => subj.name === subjectName);

    if (!subject) {
      return res.status(404).json({ msg: "Subject not found" });
    }

    const todayDate = new Date().toISOString().split('T')[0];
    const incrementValue = subject.subjectType === 2 ? 2 : 1; // Lab (2) or Theory (1)

    if (removeMark) {
      const wasPresent = subject.PresentDates.some(
        (date) => new Date(date).toISOString().split('T')[0] === todayDate
      );
      const wasAbsent = subject.AbsentDates.some(
        (date) => new Date(date).toISOString().split('T')[0] === todayDate
      );

      if (!wasPresent && !wasAbsent) {
        return res.status(400).json({ msg: "Today's date is not marked as present or absent" });
      }

      if (wasPresent) {
        subject.TotalPresent = Math.max(0, subject.TotalPresent - incrementValue); // Decrement by 2 for lab, 1 for theory
        subject.PresentDates = subject.PresentDates.filter(
          (date) => new Date(date).toISOString().split('T')[0] !== todayDate
        );
      }

      if (wasAbsent) {
        subject.TotalAbsent = Math.max(0, subject.TotalAbsent - incrementValue); // Decrement by 2 for lab, 1 for theory
        subject.AbsentDates = subject.AbsentDates.filter(
          (date) => new Date(date).toISOString().split('T')[0] !== todayDate
        );
      }

      subject.LastUpdated = new Date();
      const updatedAttendance = await attendanceData.save();

      return res.status(200).json({
        msg: "Today's attendance removed successfully",
        data: updatedAttendance,
      });
    }

    if (markPresent) {
      const wasAbsent = subject.AbsentDates.some(
        (date) => new Date(date).toISOString().split('T')[0] === todayDate
      );

      if (wasAbsent) {
        subject.TotalAbsent = Math.max(0, subject.TotalAbsent - incrementValue); // Decrement by 2 for lab, 1 for theory
      }

      subject.AbsentDates = subject.AbsentDates.filter(
        (date) => new Date(date).toISOString().split('T')[0] !== todayDate
      );

      const wasAlreadyPresent = subject.PresentDates.some(
        (date) => new Date(date).toISOString().split('T')[0] === todayDate
      );

      if (!wasAlreadyPresent) {
        subject.PresentDates.push(new Date());
        subject.TotalPresent += incrementValue; // Increment by 2 for lab, 1 for theory
      }
    } else if (markAbsent) {
      const wasPresent = subject.PresentDates.some(
        (date) => new Date(date).toISOString().split('T')[0] === todayDate
      );

      if (wasPresent) {
        subject.TotalPresent = Math.max(0, subject.TotalPresent - incrementValue); // Decrement by 2 for lab, 1 for theory
      }

      subject.PresentDates = subject.PresentDates.filter(
        (date) => new Date(date).toISOString().split('T')[0] !== todayDate
      );

      const wasAlreadyAbsent = subject.AbsentDates.some(
        (date) => new Date(date).toISOString().split('T')[0] === todayDate
      );

      if (!wasAlreadyAbsent) {
        subject.AbsentDates.push(new Date());
        subject.TotalAbsent += incrementValue; // Increment by 2 for lab, 1 for theory
      }
    } else {
      return res.status(400).json({ msg: "Specify whether to mark present or absent" });
    }

    subject.LastUpdated = new Date();
    const updatedAttendance = await attendanceData.save();

    return res.status(200).json({
      msg: "Attendance updated successfully",
      data: updatedAttendance,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error updating attendance", error: error.message });
  }
}



  



  // Add Subject
  if (addSubject) {
    if (!subjectName) {
      return res.status(400).json({ msg: "Subject name is required to add a subject." });
    }
    if (!subjectType || ![1, 2].includes(subjectType)) {
      return res.status(400).json({ msg: "Invalid or missing subjectType. Use 1 for theory or 2 for lab." });
    }

    // Validate NewTotalPresent and NewTotalAbsent
    if (NewTotalPresent < 0 || isNaN(NewTotalPresent)) {
      return res.status(400).json({ msg: "Invalid Attendance value. It cannot be negative or invalid." });
    }
    if (NewTotalAbsent < 0 || isNaN(NewTotalAbsent)) {
      return res.status(400).json({ msg: "Invalid Attendance value. It cannot be negative or invalid." });
    }
    try {
      const student = await studentattendancedetails.findOne({ roll: Number(roll) });
      if (!student) {
        return res.status(404).json({ msg: "Student not found." });
      }
      // Check if the subject already exists
      const subjectExists = student.subjects.some((subject) => subject.name === subjectName);
      if (subjectExists) {
        return res.status(400).json({ msg: "Subject already exists." });
      }
      // Add the new subject
      student.subjects.push({
        name: subjectName,
        startDate: new Date(),
        AbsentDates: [],
        PresentDates: [],
        TotalPresent: Number(NewTotalPresent) || 0,
        TotalAbsent: Number(NewTotalAbsent) || 0,
        subjectType: subjectType || 1, // Default to theory
      });
      const updatedStudent = await student.save();
      return res.status(200).json({ msg: "Subject added successfully", data: updatedStudent });
    } catch (error) {
      return res.status(500).json({ msg: "Error adding subject", error: error.message });
    }
  }
  
  if (deleteSubject) {
    if (!subjectName) {
      return res.status(400).json({ msg: "Subject name is required to delete a subject" });
    }
    try {
      // Find the student by roll
      const student = await studentattendancedetails.findOne({ roll: Number(roll) });
  
      if (!student) {
        return res.status(404).json({ msg: "Student not found" });
      }
  
      // Check if the subject exists
      const subjectIndex = student.subjects.findIndex((subject) => subject.name === subjectName);
      if (subjectIndex === -1) {
        return res.status(404).json({ msg: "Subject not found" });
      }
  
      // Remove the subject
      student.subjects.splice(subjectIndex, 1);
  
      // Save the updated data
      const updatedStudent = await student.save();
  
      return res.status(200).json({
        msg: "Subject deleted successfully",
        data: updatedStudent,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Error deleting subject", error: error.message });
    }
  }
  

  // Get Attendance
  if (getAttendance) {
    const studentAttendanceData = await studentattendancedetails.findOne({ roll: Number(roll) });
    if (!studentAttendanceData) {
      return res.status(404).json({ msg: "Attendance data not found" });
    } else {
      return res.status(200).json({ data: studentAttendanceData });
    }
  }

  return res.status(400).json({ msg: "Select a parameter to do a task" });
});

export default GetStudentAttendanceDetails;
