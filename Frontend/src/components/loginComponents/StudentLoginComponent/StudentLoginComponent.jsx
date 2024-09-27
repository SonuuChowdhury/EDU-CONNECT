import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './StudentLoginComponent.css';
import GetStudentData from '../../../api/getStudentdata.js';
import TryAgainTopBarPopup from '../../tryAgain/tryAgain.jsx';
import Loader from '../../loader/loader.jsx'
import { useDashboardContext } from '../../../context/StudentDashboardContext.jsx';


export default function StudentLoginComponent() {
    const [rollNumber,setRollNumber]=useState("");
    const [password,setPassword]=useState("");
    const [showTopPopUp,setShowTopPopUp]=useState(false)
    const [TopPopUPValue,setTopPopUPValue]=useState(500)
    const [showPassword, setShowPassword] = useState(false);
    const [loading,SetLoading]=useState(false);
    const { setDashboardData, setOpenDash } = useDashboardContext();

    const navigate=useNavigate();

    // Handler to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const rollNumberChangeHandeller=(event)=>{
        setRollNumber(event.target.value)
    }

    const passwordChangeHandeller=(event)=>{
        setPassword(event.target.value)
    }

    const submitButtonHandeller=async ()=>{
        SetLoading(true);
        try{
            const fetchedStudentData= await GetStudentData(rollNumber,password);
            if(fetchedStudentData.status==500){
                setTopPopUPValue(500)
                setShowTopPopUp(true)
            }
            else if (fetchedStudentData.status==404){
                setTopPopUPValue(404)
                setShowTopPopUp(true)
            }
            else if(fetchedStudentData.status==400){
                setTopPopUPValue(400)
                setShowTopPopUp(true)
            }
            else if(fetchedStudentData.status==200){
                setDashboardData(fetchedStudentData.data)
                setOpenDash(true);
                navigate('/student-dashboard');
            }
        }catch(error){
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
            }, 5000); // 3.5 seconds

            // Cleanup function to clear the timer
            return () => clearTimeout(timer);
        }
    }, [showTopPopUp]);

    return <>
        {showTopPopUp && <TryAgainTopBarPopup status={TopPopUPValue}/>}
        <div className='StudentLoginContainer'>
            <h1>STUDENT LOGIN</h1>
            <span className="StudentLoginHeaderBorder"></span>
            <div className="StudentLoginFormArea">
                <div className="StudentLoginFormDoodle" style={{ backgroundImage: 'url(LoginPageDoodleForStudentPage.svg)' }}></div>
                <div className='StudentLoginFormContainer'>

                    <div className='StudentLoginFormInputHeaders'>ROLL NUMBER</div>
                    <input type="text" className='StudentLoginFormInputInputs' value={rollNumber} onChange={rollNumberChangeHandeller}/>

                    <div className='StudentLoginFormInputHeaders StudentLoginFormInputHeadersPassword'>PASSWORD</div>
                    <input type={showPassword ? "text" : "password"} className='StudentLoginFormInputInputs' value={password} onChange={passwordChangeHandeller}/>
                    <div className='PasswordVisibilityDiv' onClick={togglePasswordVisibility}>
                        {showPassword ? "HIDE PASSWORD" : "SHOW PASSWORD"}
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="PasswordToggleIcon"
                        />
                    </div>

                    <button className='StudentLoginFormSubmitButton' onClick={submitButtonHandeller}>SUBMIT</button>
                </div>
            </div>
        </div>
        {loading && <Loader/>}
    </>;
}


