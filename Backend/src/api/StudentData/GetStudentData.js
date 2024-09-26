import studentbasicdetails from "../../models/students/studentDetails.js";

export default async function GetStudentDeatils({studentRoll}){
    const StudentBasicDetails= await studentbasicdetails.findOne({ roll: studentRoll })

    return StudentBasicDetails;

}