/* eslint-disable no-unused-vars */
import './SignUp.css'
import BasicNavbar from '../../components/basicNavbar/basicNavbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TryAgainTopBarPopup from '../../components/tryAgain/tryAgain'
import { useEffect } from 'react'
import Loader from '../../components/loader/loader'
import StudentSignUP from '../../api/Dashboard Data/Student/SignUpStudent.js'

import RedirectToLoginPageAfterSucces from './components/redirectToLoginPageAfterSucces.jsx'


export default function SignUp(){
    const Navigate = useNavigate();

    const [emailInput,SetEmailInput]=useState('')
    const [OtpInput,SetOtpInput]=useState('')

    const [VerifyOtp,SetVerifyOtp]= useState(false)
    const [showTopPopUp,setShowTopPopUp]=useState(false)
    const [TopPopUPValue,setTopPopUPValue]=useState(500)
    const [TopPopUPMsg,setTopPopUPMsg]=useState('')
    const [loading,SetLoading]=useState(false)

    const [EnterDetails, setEnterDetails]= useState(false)
    const [nameInput, setNameInput] = useState('')
    const [rollInput, setRollInput] = useState(0)
    const [deptInput, setDeptInput] = useState('')
    const [semInput, setSemInput] = useState(0)
    const [yearInput, setYearInput] = useState(0)
    const [mobileInput, setMobileInput] = useState(0)
    const [addressInput, SetAddressInput] = useState('')

    const [timeLeft, setTimeLeft] = useState(300); 
    const [signupComplete,setSignupComplete]=useState(false)

    useEffect(() => {
        if(EnterDetails){
            timeLeft===0?location.reload():null
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
                }, 1000);
                return () => clearInterval(timer);
        }
    }, [EnterDetails, timeLeft, Navigate]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const SignUpButtonHandeller=async()=>{
        SetLoading(true)
        try{
            if(EnterDetails){
                const data={
                    "roll": rollInput,
                    "name": nameInput,
                    "department":deptInput,
                    "semester": semInput,
                    "year": yearInput,
                    "email": emailInput,
                    "mobile": mobileInput,
                    "address": addressInput
                }
                const SignUpResponse= await StudentSignUP(data)
                if(SignUpResponse.status==200){
                    localStorage.setItem('aot-student-login-authorization-token', SignUpResponse.data.token)
                    setSignupComplete(true)
                }else{
                    setTopPopUPValue(24)
                    setTopPopUPMsg(SignUpResponse.data.msg)
                    setShowTopPopUp(true)
                }
            }else if(VerifyOtp){
                const SignUpResponse= await StudentSignUP({verifyOTP:true,email:emailInput,otp:OtpInput})
                if(SignUpResponse.status==200){
                    SetVerifyOtp(true)
                    setTopPopUPValue(23)
                    setTopPopUPMsg(SignUpResponse.data.msg)
                    setShowTopPopUp(true)
                    setEnterDetails(true)
                }else{
                    setTopPopUPValue(24)
                    setTopPopUPMsg(SignUpResponse.data.msg)
                    setShowTopPopUp(true)
                }
            }else if(!VerifyOtp){
                const SignUpResponse= await StudentSignUP({verifyEmail:true,email:emailInput})
                if(SignUpResponse.status==200){
                    SetVerifyOtp(true)
                    setTopPopUPValue(23)
                    setTopPopUPMsg(SignUpResponse.data.msg)
                    setShowTopPopUp(true)
                }else{
                    setTopPopUPValue(24)
                    setTopPopUPMsg(SignUpResponse.data.msg)
                    setShowTopPopUp(true)
                }
            }
        }finally{
            SetLoading(false)
        }
    }

    useEffect(() => {
        if (showTopPopUp) {
            const timer = setTimeout(() => {
                setShowTopPopUp(false);
            }, 5000); // 3.5 seconds
            // Cleanup function to clear the timer
            return () => clearTimeout(timer);
        }
    }, [showTopPopUp]);


    return<>
    <BasicNavbar/>
    {loading? <Loader/>: null}
    {showTopPopUp && <TryAgainTopBarPopup status={TopPopUPValue} msg={TopPopUPMsg}/>}
    {signupComplete?<RedirectToLoginPageAfterSucces/>:null}
    {!EnterDetails?
    <div className="SignUpPageArea">
        <span className="SignUPMiniHeader">Join</span>
        <span className='SignUPMainHeader'>Academy of Technology</span>
        <div className="EmailVerificationBoxForSignUP">
            <span className="EmailVerificationBoxEmailText">Email</span>
            <input type="text" className="EmailVerificationBoxInputBox" onChange={(e)=>SetEmailInput(e.target.value)} disabled={VerifyOtp}/>
            <div className="EmailVerificationBoxConfirmationArea">
                <span className='EmailVerificationBoxConfirmationAreaText'>Already have an account? </span>
                <span className="EmailVerificationBoxConfirmationAreaButton" onClick={()=>Navigate('/login')}>
                    Login
                </span>
            </div>
            <span className="EmailVerificationBoxOTP">OTP</span>
            <input type="text" className="EmailVerificationBoxInputBox" disabled={!VerifyOtp} onChange={(e)=>SetOtpInput(e.target.value)}/>
            <div className="EmailVerificationBoxButtonsArea">
                <button className="EmailVerificationBoxButtonsAreaCancelButton" onClick={()=>Navigate('/')}>Cancel</button>
                <button className="EmailVerificationBoxButtonsAreaSendOtpAndSubmitButton" onClick={SignUpButtonHandeller}>{!VerifyOtp?"Get OTP":"Verify OTP"}</button>
            </div>
        </div>
    </div>:

    <div className="DetailEntryArea">
        <div className='TimeCountingArea'>
            <p className="TimeCountingAreaWarning">The session will conclude in 5 minutes.</p>
            <p>Time Remaining:</p>
            <div style={{ color: timeLeft <= 60 ? 'red' : 'black' }}>{formatTime(timeLeft)}</div>
        </div>
        
        <div className="AddStudentFormContainer">
                <div className="AddStudentSection">
                    <h3>Email Verification</h3>
                    <label>Email:</label>
                    <input type="email" className="AddStudentInput" value={emailInput} title='Verified Email' disabled={true} />
                </div>

                <div className="AddStudentSection">
                    <h3>Student Details</h3>
                    <label>Roll Number:</label>
                    <input type="text" className="AddStudentInput" onChange={(e)=>{setRollInput(e.target.value)}}/>
                    <label>Name:</label>
                    <input type="text" className="AddStudentInput" onChange={(e)=>setNameInput(e.target.value)}/>

                    <div className="AddStudentDropdownContainer">
                        <div className="DropdownField">
                            <label>Department:</label>
                            <select className="AddStudentDropdown" onChange={(e)=>setDeptInput(e.target.value)}>
                                <option value="">Select Department</option>
                                <option value="Computer Science Engineering">Department of Computer Science Engineering (CSE)</option>
                                <option value="Electronics and Communication Engineering">Department of Electronics and Communication Engineering (ECE)</option>
                                <option value="Computer Science and Business Studies">Department of Computer Science and Business Studies (CSBS)</option>
                                <option value="Electrical Engineering">Department of Electrical Engineering (EE)</option>
                                <option value="Electrical and Electronics Engineering">Department of Electrical and Electronics Engineering (EEE)</option>
                                <option value="Mechanical Engineering">Department of Mechanical Engineering (ME)</option>
                            </select>
                        </div>

                        <div className="DropdownField">
                            <label>Semester:</label>
                            <select className="AddStudentDropdown" onChange={(e)=> setSemInput(e.target.value)}>
                                <option value="">Select Semester</option>
                                {Array.from({ length: 8 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1} {["st", "nd", "rd", "th"][Math.min(i, 3)]} Sem
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="DropdownField">
                            <label>Year:</label>
                            <select className="AddStudentDropdown" onChange={(e)=> setYearInput(e.target.value)}>
                                <option value="">Select Year</option>
                                {Array.from({ length: 4 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1} {["st", "nd", "rd", "th"][Math.min(i, 3)]} Year
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="AddStudentSection">
                    <h3>Contact Details</h3>
                    <label>Mobile:</label>
                    <input type="text" className="AddStudentInput" onChange={(e)=>setMobileInput(e.target.value)}/>
                    <label>Address:</label>
                    <input type="text" className="AddStudentInput" onChange={(e)=> SetAddressInput(e.target.value)}/>
                </div>

                <div className="AddStudentButtonContainer">
                    <button className="AddStudentCancelButton" onClick={()=>Navigate('/sign-up')}>Cancel</button>
                    <button className="AddStudentAddButton" onClick={SignUpButtonHandeller}>Add</button>
                </div>
            </div>

    </div>
}
    </>
}