import dotenv from 'dotenv'
import jwt, { decode } from 'jsonwebtoken'
import { RedisClient } from '../../db/ConnectRedis.js'

dotenv.config()

const AdminVerifyToken=async (req,res,next)=>{

    const token = req.headers['aot-student-login-authorization-token'];
    if (!token) return res.status(403).json({ msg: 'Token Not Found' });

    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        if(decoded){
            const SessionAdminIDs = await RedisClient.lRange("AdminLoginSessionID",0, -1)
            if(SessionAdminIDs.includes(String(decoded._id))){
                res.status(200).json({msg:"Authorized"})
            }
        }else{
            if (!decoded) return res.status(400).json({ msg: 'Unauthorized' });
        }
    }catch(error){
        res.status(403).json({msg:'Unauthorized'})
    }
}

export default AdminVerifyToken;