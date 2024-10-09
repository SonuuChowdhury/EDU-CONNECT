import { Router } from "express";
import path from "path";
import homeRouter from "../api/HomeData/getHomeData.js";
import getStudentCredentials from "../api/CredentialsData/Student/getStudentCredentials.js";
import getAdminCredentials from "../api/CredentialsData/Admin/AdminLogin.js";
import VerifyToken from "../middlewares/VerifyToken.js";
import GetStudentDeatils from "../api/StudentData/GetStudentData.js";
import UpdateStudentCredentials from "../api/CredentialsData/Student/UpdateStudentCredentials.js";
import ForgotPasswordHandeller from "../api/CredentialsData/Student/ForgotPassword.js";
import StudentUplaodProfile from "../api/UploadProfile/Student/StudentUplaodProfile.js";
import StudentUpdateURLProfile from "../api/UploadProfile/Student/StudentUpdateURLProfile.js";

const router = Router();

// Serving the index.html when someone requests '/'
router.get('/', (req, res) => {
    const filePath = path.resolve('public/index.html');
    res.sendFile(filePath);
});

router.get('/api/home', homeRouter); 

router.post('/login/student',getStudentCredentials)
router.post('/login/admin',getAdminCredentials)
router.post('/login/student/forgot-password',ForgotPasswordHandeller)
router.get('/api/student-dashboard', VerifyToken, GetStudentDeatils)
router.put('/api/student/change-password',VerifyToken,UpdateStudentCredentials)
router.get('/api/student/change-photo',StudentUplaodProfile)
router.put('/api/student/change-photo/update-or-delete',VerifyToken,StudentUpdateURLProfile)


export default router;
