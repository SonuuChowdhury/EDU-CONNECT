import './ChangePassword.css'

import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import GetStudentDashBoardData from '../../../api/Dashboard Data/Student/GetStudentData';
import Unauthorized from '../../../components/Errors/Unauthorized'
import Loader from '../../../components/loader/loader'
import TryAgainTopBarPopup from '../../../components/tryAgain/tryAgain';
import BasicNavbar from '../../../components/basicNavbar/basicNavbar';

import StudentPasswordChangeAPI from '../../../api/Dashboard Data/Student/ChangePassword';


export default function StudentChangePassword(){
    const navigate=useNavigate()
    
    const [isLoading,SetisLoading]=useState(false)
    const [Authorized,setAuthorized]=useState(true)
    const [NewPassword1,SetNewPassword1]=useState('')
    const [NewPassword2,SetNewPassword2]=useState('')


    useEffect(()=>{
        async function FetchData() {
            SetisLoading(true)
            try{
                const fetchdata=await GetStudentDashBoardData();
                if(fetchdata.status==403){
                    setAuthorized(false)
                }
            }catch(error){
                console.log('Error:', error)
            }finally{
                SetisLoading(false)
            }
        }
        FetchData()
    },[])

    const ChnagePasswordHandeller=async()=>{
        if(NewPassword1==''|| NewPassword2==''){
            TryAgainTopBarPopup(2)
        }
        else if(NewPassword1!=NewPassword2){
            TryAgainTopBarPopup(1)
        }
        else if(NewPassword1===NewPassword2){
            const response = await StudentPasswordChangeAPI(NewPassword1)
            console.log(response)


        }
    }


    return <>
        <BasicNavbar/>
        {isLoading?<Loader/>:null}
        {Authorized?null:<Unauthorized/>}

        <div className='StudentChangePasswordMainArea'>
            <div className="StudentChangePasswordContainer">
                <h1 className='StudentChangePasswordHeading'>CHANGE PASSWORD</h1>
                <div className="StudentChangePasswordContainerFormArea">
                    <span className='StudentChangePasswordNewPassword1'>New Password</span>
                    <input type="text" onChange={(event)=>SetNewPassword1(event.target.value)} className='StudentChangePasswordNewPassword1InputButton'/>
                    <span className='StudentChangePasswordNewPassword2'>Confirm Password</span>
                    <input type="password" onChange={(event)=>SetNewPassword2(event.target.value)} className='StudentChangePasswordNewPassword2InputButton'/>
                </div>
                
                <div className="StudentChangePasswordButtonArea">
                    <button className='StudentChangePasswordButtons StudentChangePasswordCancelButton' onClick={()=>navigate('/student-dashboard')}>Cancel</button>
                    <button className='StudentChangePasswordButtons StudentChangePasswordChangePasswordButton' onClick={ChnagePasswordHandeller}>Change Password</button>

                </div>

            </div>


        </div>
        
    </>
}