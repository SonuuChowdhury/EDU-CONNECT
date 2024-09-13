import './LoginAndSignUP.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap,faChalkboardUser,faUserTie} from '@fortawesome/free-solid-svg-icons';

import BasicNavbar from '../../components/basicNavbar/basicNavbar'
import { useState } from 'react';

function LoginAndSignUP(){
    const [RoleSelectValue,SetRoleSelectValue]=useState(0);


    const RoleSelectionHandeller=(RoleVal)=>{
        SetRoleSelectValue(RoleVal);
        console.log(RoleSelectValue);
    }

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

                </div>

            </div>

            <div className='HelplineBox'>
                <h3 className='HelplineBoxHeader'>Technical Help Desk</h3>
                <span className='HelplineBoxDevider'></span>

            </div>

        </div>
        
    
    </>

}

export default LoginAndSignUP