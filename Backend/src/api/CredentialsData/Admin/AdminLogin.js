import admincredentials from '../../../models/admins/adminlogin.js';
import express from 'express';
import jwt from  'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const getAdminCredentials = express.Router();
getAdminCredentials.use(express.json());

getAdminCredentials.post('/login/admin', async (req, res) => {
    const { uid, password } = req.body;

    // uid Number Validation
    if (!uid || isNaN(uid)) {
        return res.status(400).json({msg:"Invalid uid number"});
    }

    if (!password) {
        return res.status(400).json({msg:"Password is required"});
    }

    const AdminUID = Number(uid); 

    try {
        // Find admin with matching uid
        const admin = await admincredentials.findOne({ uid: AdminUID });
        if (!admin) {
            return res.status(404).json({msg:'admin not found'});
        }
        const isMatched = await bcrypt.compare(password,admin.password)

        if(!isMatched){
            return res.status(400).send("Invalid Password")
        }
        const token = jwt.sign({_id:admin._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(200).json({token})
    
    } catch (error) {
        return res.status(500).json({msg:`error while login: ${error}`})
    }
});

export default getAdminCredentials;
