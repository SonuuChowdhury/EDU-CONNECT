import { Router } from "express";
import path from "path";
import homeRouter from "../api/getHomeData.js";
import getStudentCredentials from "../api/CredentialsData/getStudentCredentials.js";

const router = Router();

// Serving the index.html when someone requests '/'
router.get('/', (req, res) => {
    const filePath = path.resolve('public/index.html');
    res.sendFile(filePath);
});

router.get('/api/home', homeRouter); 
router.post('/login/student',getStudentCredentials);

export default router;
