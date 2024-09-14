import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import './AdminLoginComponent.css';

export default function AdminLoginComponent() {
    const [showPassword, setShowPassword] = useState(false);

    // Handler to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="AdminLoginContainer">
                <h1>ADMIN LOGIN</h1>
                <span className="AdminLoginHeaderBorder"></span>
                <div className="AdminLoginFormArea">
                    <div className="AdminLoginFormDoodle" style={{ backgroundImage: 'url(LoginPageDoodleForAdminPage.svg)' }}></div>
                    <div className="AdminLoginFormContainer">
                        <div className="AdminLoginFormInputHeaders">ADMIN IDENTIFICATION NUMBER</div>
                        <input type="text" className="AdminLoginFormInputInputs" />

                        <div className="AdminLoginFormInputHeaders AdminLoginFormInputHeadersPassword">PASSWORD</div>
                        
                        <input type={showPassword ? "text" : "password"} className="AdminLoginFormInputInputs" />
                        <div className="PasswordVisibilityDiv" onClick={togglePasswordVisibility}>
                            {showPassword ? "HIDE PASSWORD" : "SHOW PASSWORD"}
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                className="PasswordToggleIcon"
                            />
                        </div>

                        <button className="AdminLoginFormSubmitButton">SUBMIT</button>
                    </div>
                </div>
            </div>
        </>
    );
}
