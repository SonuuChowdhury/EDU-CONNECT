import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './AdminLoginComponent.css';

import GetAdminData from '../../../api/Tokens/AdminLoginToken.js';
import Loader from '../../loader/loader.jsx';
import TryAgainTopBarPopup from '../../tryAgain/tryAgain.jsx';


export default function AdminLoginComponent() {
    const navigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [isOtpAllowed, setIsOtpAllowed] = useState(false); // State to manage OTP input
    const [idNumber, setIdNumber] = useState(""); // Track Admin Identification Number
    const [password, setPassword] = useState(""); // Track Password
    const [otp,setOtp]=useState(0)
    const [reqType,SetReqType]=useState(0)
    const [showTopPopUp,setShowTopPopUp]=useState(false)
    const [TopPopUPValue,setTopPopUPValue]=useState(500)
    const [loading,SetLoading]=useState(false);

    const [role,setRole]=useState('')

    // Handler to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handler to toggle OTP allowance and disable other fields
    const toggleOtpInput = () => {
        setIsOtpAllowed(true);
    };

    const AdminLoginButtoHandeller=async()=>{
        SetLoading(true)

        try{
            if(idNumber=="" || password==""){
                setTopPopUPValue(13)
                setShowTopPopUp(true)
            }
            else if(reqType==0){
                const ResponseData=await GetAdminData(idNumber,password,otp,reqType);
                if(ResponseData.status==200){
                    setRole(ResponseData.data.role)
                    setTopPopUPValue(11)
                    setShowTopPopUp(true)
                    toggleOtpInput()
                    SetReqType(1)
                }else if(ResponseData.status==404){
                    setTopPopUPValue(12)
                    setShowTopPopUp(true)
                }else if(ResponseData.status==400){
                    setTopPopUPValue(400)
                    setShowTopPopUp(true)
                }else{
                    setTopPopUPValue(500)
                    setShowTopPopUp(true)
                }
                
            }else if(reqType==1){
                const ResponseData=await GetAdminData(idNumber,password,otp,reqType);
                if(ResponseData.status==200){
                    const token = ResponseData.data.token;
                    localStorage.setItem('aot-student-login-authorization-token', token);

                    // Log token and navigate
                    if (localStorage.getItem('aot-student-login-authorization-token')) {
                        if(role=="superadmin"){
                            navigate('/super-admin/admin-dashboard');
                        }
                    } else {
                        console.error('Token not saved. Navigation halted.');
                    }
                }else if(ResponseData.status==404){
                    setTopPopUPValue(7)
                    setShowTopPopUp(true)
                }else if(ResponseData.status==400){
                    setTopPopUPValue(6)
                    setShowTopPopUp(true)
                }else{
                    setTopPopUPValue(500)
                    setShowTopPopUp(true)
                }
            }

        }catch(err){
            setTopPopUPValue(500)
            setShowTopPopUp(true)
        }finally{
            SetLoading(false)
        }
        

    }

    useEffect(() => {
        if (showTopPopUp) {
            const timer = setTimeout(() => {
                setShowTopPopUp(false);
            }, 5000);
    
            return () => clearTimeout(timer);
        }
    }, [showTopPopUp]);
    

    return (
        <>
        {loading && <Loader/>}
        {showTopPopUp && <TryAgainTopBarPopup status={TopPopUPValue}/>}
            <div className="AdminLoginContainer">
                <h1 className='HeadingBar'>ADMIN LOGIN</h1>
                <span className="AdminLoginHeaderBorder"></span>
                <div className="AdminLoginFormArea">
                    <div className="AdminLoginFormDoodle" style={{ backgroundImage: 'url(LoginPageDoodleForAdminPage.svg)' }}></div>
                    <div className="AdminLoginFormContainer">
                        <div className="AdminLoginFormInputHeaders">ADMIN IDENTIFICATION NUMBER</div>
                        <input
                            type="text"
                            className="AdminLoginFormInputInputs"
                            value={idNumber}
                            onChange={(e) => setIdNumber(e.target.value)}
                            disabled={isOtpAllowed} // Disable if OTP is allowed
                        />

                        <div className="AdminLoginFormInputHeaders AdminLoginFormInputHeadersPassword">PASSWORD</div>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="AdminLoginFormInputInputs"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isOtpAllowed} // Disable if OTP is allowed
                        />
                        <div className="PasswordVisibilityDiv" onClick={togglePasswordVisibility}>
                            {showPassword ? "HIDE PASSWORD" : "SHOW PASSWORD"}
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="PasswordToggleIcon"
                            />
                        </div>

                        <div className="AdminLoginFormInputHeaders AdminLoginFormInputHeadersOTP">OTP</div>
                        <input
                            type="text"
                            className="AdminLoginFormInputInputs AdminLoginFormInputInputsOTP"
                            disabled={!isOtpAllowed} // Disable until OTP is allowed
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <button
                            className="AdminLoginFormSubmitButton"
                            onClick={AdminLoginButtoHandeller}
                        >
                            {!isOtpAllowed?"GET OTP":"SUBMIT"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
