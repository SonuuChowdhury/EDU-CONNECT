import './dashboard.css';

import BasicNavbar from '../../../components/basicNavbar/basicNavbar'
import Loader from '../../../components/loader/loader';
import GetStudentDashBoardData from '../../../api/Dashboard Data/Student/GetStudentData';
import Unauthorized from '../../../components/Errors/Unauthorized';


import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



function getOrdinalSuffix(number) {
    // Get the last digit of the number
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100; // To handle exceptions like 11, 12, 13

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
        return number + 'th';
    }

    switch (lastDigit) {
        case 1:
            return number + 'st';
        case 2:
            return number + 'nd';
        case 3:
            return number + 'rd';
        default:
            return number + 'th';
    }
}

export default function StudentDashboardPage(){
    const navigate= useNavigate();
    const [data,setData]=useState({})
    const [isLoading,setisLoading]=useState(true)
    const [Authorized,setAuthorized]=useState(true)

    const LogOutHandeller=async ()=>{
        setisLoading(true)
        localStorage.removeItem('aot-student-login-authorization-token')
        navigate('/login')
    }

    useEffect(()=>{
        async function FetchData() {
            try{
                const fetchdata=await GetStudentDashBoardData();
                setData(fetchdata)
                if(fetchdata.status==403){
                    setAuthorized(false)
                }
            }catch(error){
                console.log('Error:', error)
            }finally{
                setisLoading(false)
            }
        }
        FetchData()
    },[])

    const ChangePasswordHandeller=async()=>{
        setisLoading(true)
        navigate('/student-dashboard/change-password')
    }

    
    return <>
    <BasicNavbar/>
    {isLoading? <Loader/>:null}
    {Authorized?null:<Unauthorized/>}
    <div className='MainArea'>
        <div className="ProfileSection">
            <div className="ProfilePhoto" style={{ backgroundImage: `url('defaultProfile.jpg')` }} />

            <span className='profileName'>{(data.name)}</span>
            <span style={{fontSize:"small", marginTop:"0.8rem"}}>Departmen Of</span>
            <span className='profileDepartment'>{data.department}</span>
            <span className="YearAndSem">{getOrdinalSuffix(data.year)} Year , {getOrdinalSuffix(data.semester)} Semester</span>
            <span style={{marginTop:"0.5rem"}}>{data.mobile}</span>
            <span>{data.email}</span>
            <div className="ButtonSection">
                <button className='ChangePasswordButton' onClick={ChangePasswordHandeller}>Change Password</button>
                <button className='FullProfileButton'>FULL PROFILE</button>
                <button className='LogOutButton' onClick={LogOutHandeller}>LOG OUT</button>
            </div>

        </div>
        <div className="divider"></div>
        <div className="ContentAreaSection">
            

        </div>
    </div>
    
    
    </>
}
