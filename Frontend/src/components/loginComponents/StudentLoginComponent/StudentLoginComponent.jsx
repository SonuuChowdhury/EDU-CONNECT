import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './StudentLoginComponent.css';

export default function StudentLoginComponent() {
    const [showPassword, setShowPassword] = useState(false);

    // Handler to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return <>
        <div className='StudentLoginContainer'>
            <h1>STUDENT LOGIN</h1>
            <span className="StudentLoginHeaderBorder"></span>
            <div className="StudentLoginFormArea">
                <div className="StudentLoginFormDoodle" style={{ backgroundImage: 'url(LoginPageDoodleForStudentPage.svg)' }}></div>
                <div className='StudentLoginFormContainer'>

                    <div className='StudentLoginFormInputHeaders'>ROLL NUMBER</div>
                    <input type="text" className='StudentLoginFormInputInputs' />

                    <div className='StudentLoginFormInputHeaders StudentLoginFormInputHeadersPassword'>PASSWORD</div>
                    <input type={showPassword ? "text" : "password"} className='StudentLoginFormInputInputs' />
                    <div className='PasswordVisibilityDiv' onClick={togglePasswordVisibility}>
                        {showPassword ? "HIDE PASSWORD" : "SHOW PASSWORD"}
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="PasswordToggleIcon"
                        />
                    </div>

                    <button className='StudentLoginFormSubmitButton'>SUBMIT</button>
                </div>
            </div>
        </div>
    </>;
}
