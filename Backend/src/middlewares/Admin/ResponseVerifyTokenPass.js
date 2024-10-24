import dotenv from 'dotenv'
import jwt, { decode } from 'jsonwebtoken'
import admincredentials from '../../models/admins/adminlogin.js'
import { RedisClient } from '../../db/ConnectRedis.js'

dotenv.config()

const AdminVerifyTokenPass=async (req,res,next)=>{
    const token = req.headers['aot-student-login-authorization-token'];
    if (!token) return res.status(403).json({ msg: 'Token Not Found' });

    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        if(decoded){
            req.user=decoded;
            const SessionAdminIDs = await RedisClient.lRange("AdminLoginSessionID",0, -1)
            if(SessionAdminIDs.includes(String(decoded._id))){
                next()
            }
            else{
                const adminData =  await admincredentials.findById(decoded._id)

                if(adminData.role=='superadmin'){
                    await RedisClient.rPush("AdminLoginSessionID", String(adminData._id));
                    await RedisClient.expire("AdminLoginSessionID",3600);
                    next()
                }else{
                    res.status(403).json({msg:'Unauthorized: Not Found in DB'})
                }
            }
        }else{
            res.status(403).json({msg:'Unauthorized: Session Expired'})
        }
    }catch(error){
        res.status(403).json({msg:'Unauthorized: Error Occured'})
    }
}

export default AdminVerifyTokenPass;