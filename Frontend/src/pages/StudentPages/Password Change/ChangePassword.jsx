import './ChangePassword.css'

import { useState ,useEffect} from 'react';

import GetStudentDashBoardData from '../../../api/Dashboard Data/Student/GetStudentData';
import Unauthorized from '../../../components/Errors/Unauthorized'
import Loader from '../../../components/loader/loader'
import BasicNavbar from '../../../components/basicNavbar/basicNavbar';


export default function StudentChangePassword(){
    
    const [isLoading,SetisLoading]=useState(false)
    const [Authorized,setAuthorized]=useState(true)
    const [NewPassword1,SetNewPassword1]=useState('')
    const [NewPassword2,SetNewPassword2]=useState('')


    useEffect(()=>{
        async function FetchData() {
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


    return <>
        <BasicNavbar/>
        {isLoading?<Loader/>:null}
        {Authorized?null:<Unauthorized/>}

        <div className='StudentChangePasswordMainArea'>
            <div className="StudentChangePasswordContainer">
                <h1 className='StudentChangePasswordHeading'>CHANGE PASSWORD</h1>
                <div className="StudentChangePasswordContainerFormArea">
                    <span className='StudentChangePasswordNewPassword1'>New Passoword</span>
                    <input type="text" onChange={(event)=>SetNewPassword1(event.target.value)} className='StudentChangePasswordNewPassword1InputButton'/>
                    <span className='StudentChangePasswordNewPassword2'>Confirm Passoword</span>
                    <input type="text" onChange={(event)=>SetNewPassword2(event.target.value)} className='StudentChangePasswordNewPassword2InputButton'/>
                </div>
                

                <div className="StudentChangePasswordButtonArea">
                    <button className='StudentChangePasswordButtons StudentChangePasswordCancelButton'>Cancel</button>
                    <button className='StudentChangePasswordButtons StudentChangePasswordChangePasswordButton'>Change Password</button>

                </div>

            </div>


        </div>



        
    </>
}