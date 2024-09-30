import { Router } from "express";
import path from "path";
import homeRouter from "../api/getHomeData.js";
import getStudentCredentials from "../api/CredentialsData/Student/getStudentCredentials.js";
import VerifyToken from "../middlewares/VerifyToken.js";
import GetStudentDeatils from "../api/StudentData/GetStudentData.js";
import UpdateStudentCredentials from "../api/CredentialsData/Student/UpdateStudentCredentials.js";

const router = Router();

// Serving the index.html when someone requests '/'
router.get('/', (req, res) => {
    const filePath = path.resolve('public/index.html');
    res.sendFile(filePath);
});

router.get('/api/home', homeRouter); 
router.post('/login/student',getStudentCredentials);
router.get('/api/student-dashboard', VerifyToken, GetStudentDeatils);
router.put('/api/student/change-password',VerifyToken,UpdateStudentCredentials)

export default router;
