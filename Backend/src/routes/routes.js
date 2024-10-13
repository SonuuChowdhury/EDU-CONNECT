import { Router } from "express";
import path from "path";

// Home data 
import homeRouter from "../api/HomeData/getHomeData.js";

// Login Credentials 
import getStudentCredentials from "../api/CredentialsData/Student/getStudentCredentials.js";
import getAdminCredentials from "../api/CredentialsData/Admin/AdminLogin.js";

// Student handellers 
import GetStudentDeatils from "../api/StudentData/GetStudentData.js";
import UpdateStudentCredentials from "../api/CredentialsData/Student/UpdateStudentCredentials.js";
import ForgotPasswordHandeller from "../api/CredentialsData/Student/ForgotPassword.js";
import StudentUplaodProfile from "../api/UploadProfile/Student/StudentUplaodProfile.js";
import StudentUpdateURLProfile from "../api/UploadProfile/Student/StudentUpdateURLProfile.js";

// Tokens 
import VerifyToken from "../middlewares/Student/VerifyToken.js";
import AdminVerifyToken from "../middlewares/Admin/ResponseVerifyToken.js";
import AdminVerifyTokenPass from "../middlewares/Admin/ResponseVerifyTokenPass.js";

// Content Handellers 
import GetMasterPhotos from "../api/Admins/Super Admin/Fetch Data/Home Page/GetMasterPhotosData.js";
import GetNotices from "../api/Admins/Super Admin/Fetch Data/Home Page/GetNotices.js";
import GetEvent from "../api/Admins/Super Admin/Fetch Data/Home Page/GetEvents.js";
import GetAcheivements from "../api/Admins/Super Admin/Fetch Data/Home Page/GetAcheivements.js";
import GetFacilities from "../api/Admins/Super Admin/Fetch Data/Home Page/GetFacilities.js";
import GetFacultyDetails from "../api/Admins/Super Admin/Fetch Data/Home Page/GetFacultyDetails.js";
import GetMessages from "../api/Admins/Super Admin/Fetch Data/Home Page/GetMessages.js";
import GetFaqs from "../api/Admins/Super Admin/Fetch Data/Home Page/GetFaqs.js";
import GetFooterInfo from "../api/Admins/Super Admin/Fetch Data/Home Page/GetFooterInfo.js";

const router = Router();

// Serving the index.html when someone requests '/'
router.get('/', (req, res) => {
    const filePath = path.resolve('public/index.html');
    res.sendFile(filePath);
});

router.get('/api/home', homeRouter); 

// Studet Login 
router.post('/login/student',getStudentCredentials)
router.post('/login/student/forgot-password',ForgotPasswordHandeller)
// Studet routes 
router.get('/api/student-dashboard', VerifyToken, GetStudentDeatils)
router.put('/api/student/change-password',VerifyToken,UpdateStudentCredentials)
router.get('/api/student/change-photo',StudentUplaodProfile)
router.put('/api/student/change-photo/update-or-delete',VerifyToken,StudentUpdateURLProfile)

// admin login 
router.post('/login/admin',getAdminCredentials)
// Speradmin Routes
router.post('/auth/superadmin',AdminVerifyToken)
// apis 
router.get('/api/super-admin/masterphotos',AdminVerifyTokenPass,GetMasterPhotos)
router.get('/api/super-admin/notices',AdminVerifyTokenPass,GetNotices)
router.get('/api/super-admin/events',AdminVerifyTokenPass,GetEvent)
router.get('/api/super-admin/achievements',AdminVerifyTokenPass,GetAcheivements)
router.get('/api/super-admin/facilities',AdminVerifyTokenPass,GetFacilities)
router.get('/api/super-admin/faculty-details',AdminVerifyTokenPass,GetFacultyDetails)
router.get('/api/super-admin/messages',AdminVerifyTokenPass,GetMessages)
router.get('/api/super-admin/faqs',AdminVerifyTokenPass,GetFaqs)
router.get('/api/super-admin/footer-info',AdminVerifyTokenPass,GetFooterInfo)



export default router;
