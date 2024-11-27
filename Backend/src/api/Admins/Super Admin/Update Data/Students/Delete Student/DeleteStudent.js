import express from "express";
import studentbasicdetails from "../../../../../../models/students/studentDetails.js";
import studentcredentials from "../../../../../../models/students/studentCredentials.js";
import studentattendancedetails from '../../../../../../models/students/studentAttendanceDetails.js';

const DeleteStudentByRoll = express.Router();
DeleteStudentByRoll.use(express.json());

DeleteStudentByRoll.delete("/api/delete/student", async (req, res) => {
    const { roll } = req.body;

    if (!roll) {
        return res.status(404).json({ msg: "Enter Roll Number" });
    }
    try {
        const studentDetailsDeletionStatus = await studentbasicdetails.deleteOne({ roll });
        const studentCredentialsDeletionStatus = await studentcredentials.deleteOne({ roll });
        const studentAttendanceDetails = await studentattendancedetails.deleteOne({roll});

        if (studentDetailsDeletionStatus.deletedCount > 0 && studentCredentialsDeletionStatus.deletedCount > 0) {
            return res.status(200).json({ msg: "Student Deleted Successfully" });
        } else {
            return res.status(400).json({ msg: "Failed to Delete Student Or Student does not exists" });
        }
    } catch (error) {
        console.error("Error deleting student:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
});

export default DeleteStudentByRoll;
