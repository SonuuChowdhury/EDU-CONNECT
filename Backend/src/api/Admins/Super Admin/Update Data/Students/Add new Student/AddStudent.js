import express from "express";

import studentbasicdetails from "../../../../../../models/students/studentDetails.js";
import studentcredentials from "../../../../../../models/students/studentCredentials.js";

import HashPassword from "../../../../../../../Demo/PasswordConverter.js";

import SendMailForNewStudent from "../../../../../../mails/SendMailForNewStudent.js";

const AddStudent = express.Router();
AddStudent.use(express.json());

AddStudent.put("/api/add/student", async (req, res) => {
    const { roll, name, department, semester, year, email, mobile, address } = req.body;

    try {
        if (roll) {
            const existingStudents = await studentcredentials.find({
                $or: [{ roll: roll }, { email: email }, { mobile: mobile }]
            });

            // Check if any student matches the roll number, email, or mobile number
            const studentExist = existingStudents.find(student => student.roll === roll);
            if (studentExist) {
                return res.status(400).json({ msg: "Student Already Exists", code: 0 });
            }

            const studentEmailExist = existingStudents.find(student => student.email === email);
            if (studentEmailExist) {
                return res.status(400).json({ msg: "Email Already Exists", code: 1 });
            }

            const studentMobileExist = existingStudents.find(student => student.mobile === mobile);
            if (studentMobileExist) {
                return res.status(400).json({ msg: "Mobile Already Exists", code: 2 });
            }
        }

        if (!roll || !name || !department || !semester || !year || !email || !mobile || !address) {
            return res.status(400).json({ msg: "All Data is Required" });
        } else {
            const DefaultPass = await HashPassword("password");

            const newStudentCredentials = new studentcredentials({
                roll: roll,
                password: DefaultPass // Default password
            });

            const newStudentBasicDetails = new studentbasicdetails({
                roll: roll,
                name: name,
                isProfile: false,
                profile: null,
                department: department,
                year: year,
                semester: semester,
                email: email,
                mobile: mobile,
                address: address
            });

            try {
                // Save the student credentials and basic details
                const savedStudentCredentials = await newStudentCredentials.save();
                const savedStudentDetails = await newStudentBasicDetails.save();

                if (savedStudentCredentials && savedStudentDetails) {
                    await SendMailForNewStudent(email, name, roll);
                    res.status(200).json({ msg: "Student Added Successfully" });
                } else {
                    res.status(400).json({ msg: "Student cannot be Added" });
                }
            } catch (error) {
                console.log(error);
                res.status(400).json({ msg: "Student cannot be Added" });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

export default AddStudent;
