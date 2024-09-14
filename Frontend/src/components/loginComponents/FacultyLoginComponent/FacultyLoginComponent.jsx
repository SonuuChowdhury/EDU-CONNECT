import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './FacultyLoginComponent.css'

export default function FacultyLoginComponent() {
    const [showPassword, setShowPassword] = useState(false);

    // Handler to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return <>
        <div className='FacultyLoginContainer'>
            <h1>FACULTY LOGIN</h1>
            <span className="FacultyLoginHeaderBorder"></span>
            <div className="FacultyLoginFormArea">
                <div className="FacultyLoginFormDoodle" style={{backgroundImage:'url(LoginPageDoodleForFacultyPage.svg)'}}></div>
                <div className='FacultyLoginFormContainer'>

                    <div className='FacultyLoginFormInputHeaders'>UNIQUE IDENTIFICATION NUMBER</div>
                    <input type="text" className='FacultyLoginFormInputInputs'/>

                    <div className='FacultyLoginFormInputHeaders FacultyLoginFormInputHeadersPassword'>PASSWORD</div>
                    
                    <input type={showPassword ? "text" : "password"} className='FacultyLoginFormInputInputs'/>
                    <div className='PasswordVisibilityDiv' onClick={togglePasswordVisibility}>{showPassword? "HIDE PASSWORD":"SHOW PASSWORD"}
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="PasswordToggleIcon"
                        />
                    </div>
                        

                    <button className='FacultyLoginFormSubmitButton'>SUBMIT</button>
                </div>
            </div>
        </div>
    </>
}
