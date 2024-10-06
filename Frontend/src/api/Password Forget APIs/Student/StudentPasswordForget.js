import axios from 'axios'

export default async function StudentForgetPasswordAPI(roll,reqType,otp){

    // reqType = 1 for OTP verifications and =2 for Email Sending 
    if(reqType==0){
        try{
            const SendOTPResponse=await axios.post('https://institute-site-az-bug-busters.onrender.com/login/student/forgot-password',{
                "roll":roll,
                "reqType":reqType,
            })
            return SendOTPResponse
        }catch(err){
            return {"status":500}
        }
    }

    if(reqType==1){
        try{
            const VerifyOTPResponse=await axios.post('https://institute-site-az-bug-busters.onrender.com/login/student/forgot-password',{
                "roll":roll,
                "reqType":reqType,
                "otp":otp
            })
            console.log(VerifyOTPResponse)
            return VerifyOTPResponse
        }catch(err){
            return {"status":err.status}
        }
    }
}