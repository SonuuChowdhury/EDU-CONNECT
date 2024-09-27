import './dashboard.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BasicNavbar from '../../../components/basicNavbar/basicNavbar'
import { useDashboardContext } from '../../../context/StudentDashboardContext'

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
    const navigate=useNavigate();
    const {dashboardData,OpenDash}=  useDashboardContext();
    useEffect(() => {
        if (OpenDash !== undefined && !OpenDash) {
            navigate('/login');
        }
    }, [OpenDash, navigate]);
    
    const [data, setData] = useState(() => {
        // Try to load data from local storage on initial load
        const savedData = localStorage.getItem('dashboardData');
        return savedData ? JSON.parse(savedData) : dashboardData;
    });

    useEffect(() => {
        if (dashboardData) {
            localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
            setData(dashboardData); // Sync state with updated context data
        }
    }, [dashboardData]);


    return <>
    <BasicNavbar/>
    <div className='MainArea'>
        <div className="ProfileSection">
            <div className="ProfilePhoto" style={{ backgroundImage: `url('defaultProfile.jpg')` }} />

            <span className='profileName'>{(data.name)}</span>
            <span style={{fontSize:"small", marginTop:"0.3rem"}}>Departmen Of</span>
            <span className='profileDepartment'>{data.department}</span>
            <span className="YearAndSem">{getOrdinalSuffix(data.year)} Year , {getOrdinalSuffix(data.semester)} Semester</span>
            <span style={{marginTop:"0.5rem"}}>{data.mobile}</span>
            <span>{data.email}</span>
            <div className="ButtonSection">
                <button className='FullProfileButton'>FULL PROFILE</button>
                <button className='LogOutButton'>LOG OUT</button>
            </div>

        </div>
        <div className="divider"></div>
        <div className="ContentAreaSection">
            

        </div>
    </div>
    
    
    </>



}