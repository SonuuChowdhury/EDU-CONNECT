import { Router } from "express";
import path from "path";
import homeRouter from "../api/getHomeData.js";
import getStudentCredentials from "../api/CredentialsData/getStudentCredentials.js";
import VerifyToken from "../middlewares/VerifyToken.js";
import GetStudentDeatils from "../api/StudentData/GetStudentData.js";

const router = Router();

// Serving the index.html when someone requests '/'
router.get('/', (req, res) => {
    const filePath = path.resolve('public/index.html');
    res.sendFile(filePath);
});

router.get('/api/home', homeRouter); 
router.get('/api/student-dashboard', VerifyToken, GetStudentDeatils)
router.post('/login/student',getStudentCredentials);

export default router;
