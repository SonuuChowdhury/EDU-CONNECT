import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const VerifyToken=(req,res,next)=>{

    const token = req.headers['aot-student-login-authorization-token'];
    if (!token) return res.status(403).json({ msg: 'Unauthorized' });

    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded;
        next()
    }catch(error){
        res.status(403).json({msg:'Unauthorized'})
    }
}

export default VerifyToken;