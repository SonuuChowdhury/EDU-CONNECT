import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './StudentLoginComponent.css';
import GetStudentData from '../../../api/getStudentdata.js';


export default function StudentLoginComponent() {
    const [rollNumber,setRollNumber]=useState("");
    const [password,setPassword]=useState("");

    const [showPassword, setShowPassword] = useState(false);

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
        const fetchedStudentData= await GetStudentData(rollNumber,password);
        if(fetchedStudentData.status==500){
            console.log("error")
            
        }
        else if(fetchedStudentData.status==200){
            console.log(fetchedStudentData.data)
        }
    }
    return <>
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
    </>;
}
