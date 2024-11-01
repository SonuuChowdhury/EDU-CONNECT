import './AdminAddStudent.css';
import '../../Dashboard/Dashboard.css';

import TryAgainTopBarPopup from '../../../../../components/tryAgain/tryAgain'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../../../../components/loader/loader';
import Unauthorized from '../../../../../components/Errors/Unauthorized';

import BasicNavbar from '../../../../../components/basicNavbar/basicNavbar';
import SuperAdminAuth from '../../../../../api/Auth/SuperAdminAuth';

import AddStudentAPI from '../../../../../api/Student Control APIs/AddStudentAPI';

export default function AdminAddStudent() {
    const [errorStatus, setErrorStatus] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [ShowTopUp, SetShowTopUp] = useState(false)

    const [isLoading, setisLoading] = useState(false);
    const [Authorized, setAuthorized] = useState(false);

    const [EmailInputButtonDisabled, setEmailInputButtonDisabled] = useState(false)
    const [VerifyOTPBUttonDisabled, setVerifyOTPBUttonDisabled] = useState(true)

    const [emailInput,setEmailInput] = useState('')
    const [otpInput ,setOtpInput] = useState(0)

    const [IsAddButtonDisabled, setIsAddButtonDisabled] = useState(true)
    const [isFormInputDataDisabled, setIsFormInputDataDisabled] = useState(true)

    const [nameInput, setNameInput] = useState('')
    const [rollInput, setRollInput] = useState(0)
    const [deptInput, setDeptInput] = useState('')
    const [semInput, setSemInput] = useState(0)
    const [yearInput, setYearInput] = useState(0)
    const [mobileInput, setMobileInput] = useState(0)
    const [addressInput, SetAddressInput] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const CheckAuth = async () => {
            setisLoading(true);
            try {
                const SuperAdminAuthData = await SuperAdminAuth();
                if (SuperAdminAuthData.status === 200) {
                    setAuthorized(true);
                } else {
                    setAuthorized(false);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setisLoading(false);
            }
        };
        CheckAuth();
    }, []);

    const GetOTPHandeller= async()=>{
        setisLoading(true)
        try{
            const GetOtpResponse = await AddStudentAPI({verifyEmail:true, email:emailInput})
            if(GetOtpResponse.status==200){
                setErrorMsg(GetOtpResponse.data.msg)
                setErrorStatus(23)
                SetShowTopUp(true)
                setVerifyOTPBUttonDisabled(false)
                setEmailInputButtonDisabled(true)
            }else{
                setErrorMsg(GetOtpResponse.data.msg)
                setErrorStatus(24)
                SetShowTopUp(true)
            }
        }catch(err){
            setErrorStatus(500)
            SetShowTopUp(true)
        }finally{
            setisLoading(false)
        }
    }

    const VerifyOTPHandeller=async()=>{
        setisLoading(true)
        try{
            const verifyOtpResponse = await AddStudentAPI({verifyOTP:true, otp:otpInput, email:emailInput})
            if(verifyOtpResponse.status==200){
                setErrorMsg(verifyOtpResponse.data.msg)
                setErrorStatus(23)
                SetShowTopUp(true)
                setVerifyOTPBUttonDisabled(true)
                setIsFormInputDataDisabled(false)
                setIsAddButtonDisabled(false)
            }else if(verifyOtpResponse.status == 404){
                setErrorStatus(24)
                SetShowTopUp(true)
            }else if(verifyOtpResponse.status==400){
                setErrorStatus(24)
                SetShowTopUp(true)
            }else{
                setErrorStatus(500)
                SetShowTopUp(true)
            }
        }catch(err){
            setErrorStatus(500)
            SetShowTopUp(true)
        }finally{
            setisLoading(false)
        }
    }

    useEffect(() => {
        if (ShowTopUp) {
            const timer = setTimeout(() => {
                SetShowTopUp(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [ShowTopUp]);


    const TaskCompleteHandeller = ()=>{
        setTimeout(() => {
            setErrorStatus(25)
            SetShowTopUp(true) 
            setTimeout(() => {
                navigate('/super-admin/admin-dashboard')
            }, 3000);
        }, 3000);
    }

    useEffect(() => {
        const CheckAuth = async ()=>{
            setisLoading(true)
            try{
                const SuperAdminAuthData =await SuperAdminAuth()
                if(SuperAdminAuthData.status==200){
                    setAuthorized(true)
                }else{
                    setAuthorized(false)
                }
            }catch(err){
                console.log(err)
            }finally{
                setisLoading(false)
            }
        }
        CheckAuth()
    },[])


    const AddStudentHandeller=async()=>{
        setisLoading(true);
        try{
            const StudentAddDataResponse = await AddStudentAPI({
                verifyEmail:false,
                verifyOTP:false,
                otp:otpInput,
                roll:rollInput, 
                name:nameInput, 
                department:deptInput, 
                semester:semInput, 
                year:yearInput, 
                email:emailInput, 
                mobile:mobileInput, 
                address:addressInput
            });

            console.log(StudentAddDataResponse)

            if(StudentAddDataResponse.status == 200){
                setErrorMsg(StudentAddDataResponse.data.msg)
                setErrorStatus(23)
                SetShowTopUp(true)
                setIsAddButtonDisabled(true)
                setIsFormInputDataDisabled(true)
                TaskCompleteHandeller()
            }if(StudentAddDataResponse.status == 400){
                setErrorMsg(StudentAddDataResponse.data.msg)
                setErrorStatus(24)
                SetShowTopUp(true)
            }
        }catch(err){
            setErrorStatus(500)
            SetShowTopUp(true)
        }finally{
            setisLoading(false)
        }
    }

    return (
        <>
            <BasicNavbar />
            {isLoading ? <Loader /> : null}
            {Authorized ? null : <Unauthorized />}
            {ShowTopUp ? <TryAgainTopBarPopup status={errorStatus} msg={errorMsg}/> : null}

            <div className="TopAreaDashboard">
                <span className="SuperAdminHeaders">
                    <span className="SuperAdminHeader">WELCOME SUPER ADMIN</span>
                    <span className="SuperAdminSubHeader">ADD STUDENT SECTION</span>
                </span>
                <button className="SuperAdminLogOutFeature" onClick={() => navigate('/super-admin/admin-dashboard')}>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Dashboard
                </button>
            </div>

            <div className="AddStudentFormContainer">
                <div className="AddStudentSection">
                    <h3>Email Verification</h3>
                    <label>Email:</label>
                    <input type="email" className="AddStudentInput" onChange={(e)=>setEmailInput(e.target.value)} disabled={EmailInputButtonDisabled} />
                    <button className="AddStudentButton" onClick={()=> GetOTPHandeller()} disabled={EmailInputButtonDisabled} >Get OTP</button>
                    <label>OTP:</label>
                    <input type="text" className="AddStudentInput" disabled={VerifyOTPBUttonDisabled} onChange={(e)=>setOtpInput(e.target.value)}/>
                    <button className="AddStudentButton" disabled={VerifyOTPBUttonDisabled}    onClick={()=> VerifyOTPHandeller()}>Verify</button>
                </div>

                <div className="AddStudentSection">
                    <h3>Student Details</h3>
                    <label>Roll Number:</label>
                    <input type="text" className="AddStudentInput" onChange={(e)=>{setRollInput(e.target.value)}} disabled={isFormInputDataDisabled}/>
                    <label>Name:</label>
                    <input type="text" className="AddStudentInput" onChange={(e)=>setNameInput(e.target.value)} disabled={isFormInputDataDisabled}/>

                    <div className="AddStudentDropdownContainer">
                        <div className="DropdownField">
                            <label>Department:</label>
                            <select className="AddStudentDropdown" onChange={(e)=>setDeptInput(e.target.value)} disabled={isFormInputDataDisabled}>
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
                            <select className="AddStudentDropdown" onChange={(e)=> setSemInput(e.target.value)} disabled={isFormInputDataDisabled}>
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
                            <select className="AddStudentDropdown" onChange={(e)=> setYearInput(e.target.value)} disabled={isFormInputDataDisabled}>
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
                    <input type="text" className="AddStudentInput" onChange={(e)=>setMobileInput(e.target.value)} disabled={isFormInputDataDisabled}/>
                    <label>Address:</label>
                    <input type="text" className="AddStudentInput" onChange={(e)=> SetAddressInput(e.target.value)} disabled={isFormInputDataDisabled}/>
                </div>

                <div className="AddStudentButtonContainer">
                    <button className="AddStudentCancelButton" onClick={()=>navigate('/super-admin/admin-dashboard')}>Cancel</button>
                    <button className="AddStudentAddButton" disabled={IsAddButtonDisabled}  onClick={()=> AddStudentHandeller()}>Add</button>
                </div>
            </div>
        </>
    );
}
