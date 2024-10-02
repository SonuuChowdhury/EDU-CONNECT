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
    const [errorStatus, setErrorStatus] = useState(null);
    const [ShowTopUp,SetShowTopUp]=useState(false)


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

    useEffect(() => {
        if (ShowTopUp) {
            const timer = setTimeout(() => {
                SetShowTopUp(false);
            }, 3000); 
            return () => clearTimeout(timer);
        }
    }, [ShowTopUp]);

    const ChangePasswordHandler = async () => {
        SetisLoading(true)
        try{
            if (NewPassword1 === '' || NewPassword2 === '') {
                SetShowTopUp(true)
                setErrorStatus(2); 
            } else if (NewPassword1 !== NewPassword2) {
                SetShowTopUp(true)
                setErrorStatus(1);
            } else {
                const response = await StudentPasswordChangeAPI(NewPassword1);
                if(response.status==(403 || 200 || 500)){
                    setErrorStatus(3)
                    SetShowTopUp(true)
                }else if(response.status==200){
                    setErrorStatus(4)
                    SetShowTopUp(true)
                    SetNewPassword1('')
                    SetNewPassword2('')
                }
            }
        }catch(err){
            setErrorStatus(3)
            SetShowTopUp(true)
        }finally{
            SetisLoading(false)
        }
        
    }

    return <>
        <BasicNavbar/>
        {isLoading?<Loader/>:null}
        {Authorized?null:<Unauthorized/>}
        {ShowTopUp ? <TryAgainTopBarPopup status={errorStatus} /> : null}

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
                    <button className='StudentChangePasswordButtons StudentChangePasswordCancelButton' onClick={()=>navigate('/student-dashboard')}>Back to Dashboard</button>
                    <button className='StudentChangePasswordButtons StudentChangePasswordChangePasswordButton' onClick={ChangePasswordHandler}>Change Password</button>

                </div>

            </div>


        </div>
        
    </>
}