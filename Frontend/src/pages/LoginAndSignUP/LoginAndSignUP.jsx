// modules importing 
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap,faChalkboardUser,faUserTie} from '@fortawesome/free-solid-svg-icons';

// stylings 
import './LoginAndSignUP.css'


// components 
import BasicNavbar from '../../components/basicNavbar/basicNavbar'
import StudentLoginComponent from '../../components/loginComponents/StudentLoginComponent/StudentLoginComponent'
import FacultyLoginComponent from '../../components/loginComponents/FacultyLoginComponent/FacultyLoginComponent'
import AdminLoginComponent from '../../components/loginComponents/AdminLoginComponent/AdminLoginComponent'

function LoginAndSignUP(){
    const [RoleSelectValue,SetRoleSelectValue]=useState(0);


    const RoleSelectionHandeller=(RoleVal)=>{
        SetRoleSelectValue(RoleVal);
        console.log(RoleSelectValue);
    }

    const renderLoginComponent = () => {
        switch (RoleSelectValue) {
            case 0:
                return <StudentLoginComponent />;
            case 1:
                return <FacultyLoginComponent />;
            case 2:
                return <AdminLoginComponent />;
            default:
                return <StudentLoginComponent />; // default to student login
        }
    };

    return <>
        <BasicNavbar/>
        
        <div className="RoleSelectionArea">
            <div className='loginHeader'>LOGIN AS :</div>
            <div className="RoleSelector RoleSelectionStudent" onClick={()=>{RoleSelectionHandeller(0)}}>
                <FontAwesomeIcon icon={faGraduationCap} className='RoleSelectorIcon'/>
                <h2 className='RoleSelectorHeader'>Student</h2>
            </div>
            <div className="RoleSelector RoleSelectionFaculty" onClick={()=>{RoleSelectionHandeller(1)}}>
                <FontAwesomeIcon icon={faChalkboardUser} className='RoleSelectorIcon'/>
                <h2 className='RoleSelectorHeader'>Faculty</h2>
            </div>
            <div className="RoleSelector RoleSelectionAdmin" onClick={()=>{RoleSelectionHandeller(2)}}>
                <FontAwesomeIcon icon={faUserTie} className='RoleSelectorIcon'/>
                <h2 className='RoleSelectorHeader'>Admin</h2>
            </div>
        </div>

        <div className="LoginAndHelpkineArea">
            <div className="LoginArea">
                <div className="LoginAreaContainerMain">
                    {renderLoginComponent()}
                </div>
            </div>

            <div className='HelplineBox'>
                <h3 className='HelplineBoxHeader'>Technical Help Desk</h3>
                <span className='HelplineBoxDevider'></span>
                <div className="HelplineBoxInfo">
                    <div className='HelplineBoxInfoContainer'>Mail: Chowdhurysonu047@gmail.com</div>
                    <div className='HelplineBoxInfoContainer'>Mobile: 4573XXXX85</div>
                    <div className='HelplineBoxInfoContainer'>landline: 045-923-4X78</div>
                </div>

            </div>

        </div>
        
    
    </>

}

export default LoginAndSignUP