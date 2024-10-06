/* eslint-disable no-unused-vars */
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";

import './StudentForgetPasword.css';

import BasicNavbar from "../../../basicNavbar/basicNavbar";
import Loader from "../../../loader/loader";
import TryAgainTopBarPopup from "../../../tryAgain/tryAgain";

import StudentForgetPasswordAPI from "../../../../api/Password Forget APIs/Student/StudentPasswordForget";

export default function StudentForgetPassword() {

    const navigate=useNavigate()

    const [isLoading, setIsLoading] = useState(false);
    const [rollNumber, setRollNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [reqType, setReqType] = useState(0); // 0 for sending OTP, 1 for verifying OTP
    const [SendOTPResponseVar,setSendOTPResponseVar]=useState({})
    const [VerifyOTPResponseVar,setVerifyOTPResponseVar]=useState({})
    const [ShowTopUPBar,setShowTopUPBar]=useState(false)
    const [TopUpBarStatus,SetTopUpBarStatus]=useState()

    // Handlers to update state
    const handleRollNumberChange = (e) => {
        setRollNumber(e.target.value);
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSendOtpClick =async () => {
        setIsLoading(true)
        try{
            const SendOTPResponse=await StudentForgetPasswordAPI(rollNumber,0,otp)
            setSendOTPResponseVar(SendOTPResponse.data)
        }catch(err){
            console.log(err)
        }finally{
            setReqType(1)
            setIsLoading(false)
        }
    };


    const handleVerifyOtpClick = async() => {
        setIsLoading(true)
        try{
            const VerifyOTPResponse = await StudentForgetPasswordAPI(rollNumber,1,otp)
            setVerifyOTPResponseVar(VerifyOTPResponse.data)

            if (VerifyOTPResponse.status == 200) {
                localStorage.setItem('aot-student-login-authorization-token', VerifyOTPResponse.data.token);
                SetTopUpBarStatus(5);
                setTimeout(() => {
                    navigate('/student-dashboard/change-password');
                }, 2000);

            } else if (VerifyOTPResponse.status == 500) {
                SetTopUpBarStatus(500); 
            } else if (VerifyOTPResponse.status == 400) {
                SetTopUpBarStatus(6);
            } else if (VerifyOTPResponse.status == 404) {
                SetTopUpBarStatus(7); 
            }
            setShowTopUPBar(true);

        }catch(err){
            SetTopUpBarStatus(500)
            setShowTopUPBar(true)
        }finally{
            setIsLoading(false)
        }
    };

    const handleCancelClick = () => {
        navigate('/login')
    };

    useEffect(() => {
        const timer = setTimeout(() => {
          setShowTopUPBar(false);
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [ShowTopUPBar]);


    return (
        <>
            {isLoading ? <Loader /> : null}
            {ShowTopUPBar?<TryAgainTopBarPopup status={TopUpBarStatus}/>:null}

            <BasicNavbar />
            <div className="StudentForgetPasswordMainArea">
                <div className="StudentForgetPasswordForm">
                    <h1 className="StudentForgetPasswordTitle">RESET PASSWORD</h1>
                    
                    <label className="StudentForgetPasswordLabel" htmlFor="rollNumber">ROLL NUMBER</label>
                    <input type="text" className={reqType==1? "StudentForgetPasswordInputDisabled":"StudentForgetPasswordInput"} onChange={handleRollNumberChange} disabled={reqType === 1}/>
                    {reqType === 1 && (
                        <>
                        <span className="StudentForgetPasswordInfo">Hello, {SendOTPResponseVar.name}</span>
                        <span className="StudentForgetPasswordInfo">OTP sent to : {SendOTPResponseVar.email}</span>
                        <label className="StudentForgetPasswordLabel StudentForgetPasswordLabelOTPText" htmlFor="otp">OTP</label>
                        <input type="text" className="StudentForgetPasswordInput" onChange={handleOtpChange}/>
                        </>
                    )}

                    {reqType === 0 ? (
                        <button className="StudentForgetPasswordButton" onClick={handleSendOtpClick}>
                            Send OTP
                        </button>
                    ) : (
                        <button className="StudentForgetPasswordButton" onClick={handleVerifyOtpClick}>Verify OTP</button>
                    )}

                    {/* Cancel button */}
                    <button className="StudentForgetPasswordCancelButton" onClick={handleCancelClick}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}
