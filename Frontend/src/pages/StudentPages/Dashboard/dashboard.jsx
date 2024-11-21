import './dashboard.css';
import BasicNavbar from '../../../components/basicNavbar/basicNavbar';
import Loader from '../../../components/loader/loader';
import GetStudentDashBoardData from '../../../api/Dashboard Data/Student/GetStudentData';
import Unauthorized from '../../../components/Errors/Unauthorized';
import StudentUplaodImageComponent from '../../../components/DashboardComponents/Student/UplaodImageComponent/StudentUplaodImageComponent';

import AttendacePage from '../Attendance Page/AttendancePage';

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function getOrdinalSuffix(number) {
    const lastDigit = number % 10;
    const lastTwoDigits = number % 100;
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

export default function StudentDashboardPage() {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [Authorized, setAuthorized] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState('');

    const [watchDashboard,setWatchDashboard] = useState(true)

    const [ViewAttendanceDashboard,setViewAttendanceDashboard] = useState(false)



    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false); // <-- Modal state
    const [isOffline, setIsOffline] = useState(!navigator.onLine); // <-- Check initial offline status

    const LogOutHandeller = async () => {
        setisLoading(true);
        localStorage.removeItem('aot-student-login-authorization-token');
        navigate('/login');
    };

    useEffect(() => {
        async function FetchData() {
            try {
                const fetchdata = await GetStudentDashBoardData();
                setData(fetchdata);
                setShowProfile(fetchdata.isProfile);
                if (fetchdata.status === 403) {
                    setAuthorized(false);
                }
            } catch (error) {
                if (error.status === 403) {
                    setAuthorized(false);
                }
            } finally {
                setisLoading(false);
            }
        }
        if (!isOffline) {
            FetchData();
        }
    }, [showProfile, isOffline]);

    const ChangePasswordHandeller = async () => {
        setisLoading(true);
        navigate('/student-dashboard/change-password');
    };

    // Function to close modal when clicking outside the modal box
    const handleOutsideClick = (e) => {
        if (e.target.className === 'studentModalOverlay') {
            setIsModalOpen(false);  // <-- Close the modal
        }
    };

    useEffect(() => {
        if (showProfile && data.profile) {
            // Append a timestamp to the URL to prevent caching issues
            const updatedProfileUrl = data.profile;
            setProfilePictureUrl(updatedProfileUrl);
        } else {
            setProfilePictureUrl('defaultProfile.jpg');
        }
    }, [showProfile, data]);

    // Listen for online/offline events
    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Function to render the "You are offline" page
    const renderOfflinePage = () => (
        <div className="studentOfflinePage">
            <img src="/offlineSVG.svg" alt="You are offline" className="studentOfflineImage" />
            <h2 className="studentOfflineHeading">You are offline</h2>
            <p className="studentOfflineText">Please check your internet connection and try again.</p>
        </div>
    );

    const OpenAttendanceHandeller= useCallback(async()=>{
        setWatchDashboard(false)
        setViewAttendanceDashboard(true)
    },[])


    


    return (
        <>
            <BasicNavbar />
            {isLoading && !isOffline ? <Loader /> : null}
            {!Authorized && !isOffline ? <Unauthorized /> : null}
            {isOffline ? (
                renderOfflinePage() // Display offline message if user is offline
            ) : (
                <div className='studentMainArea'>
                    <div className="studentProfileSection">
                        <div className="studentProfilePhoto" style={{ backgroundImage: `url(${profilePictureUrl})` }}>
                            <div className="studentUploadOrChangeProfilePIcture" onClick={() => setIsModalOpen(true)}>
                            </div>
                        </div>

                        <span className='studentProfileName'>{data.name}</span>
                        <span className="StudentRollNumber">{data.roll}</span>
                        <span style={{ fontSize: "small", marginTop: "0.8rem" }}>Department Of</span>
                        <span className='studentProfileDepartment'>{data.department}</span>
                        <span className="studentYearAndSem">{getOrdinalSuffix(data.year)} Year , {getOrdinalSuffix(data.semester)} Semester</span>
                        <span style={{ marginTop: "0.5rem" }}>{data.mobile}</span>
                        <span>{data.email}</span>
                        <div className="studentButtonSection">
                            <button className='studentChangePasswordButton' onClick={ChangePasswordHandeller}>Change Password</button>
                            <button className='studentLogOutButton' onClick={LogOutHandeller}>LOG OUT</button>
                        </div>
                    </div>
                    <div className="studentDivider"></div>
                    <div className="studentContentAreaSection">

                    {watchDashboard?(
                        
                        <div className="studentContentGrid">
                                <div className="studentContentItem" onClick={()=>OpenAttendanceHandeller()}> 
                                    <p className='studentContentItemName'>Attendance Monitoring</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>Enrollment Form</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>CA Marks</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>PCA Marks</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>Exam Form</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>Admit Card</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>Backlog Form</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>Sem Result</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>Review Result</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>Payments</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>Online Exam</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>Mock Exams</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>Issued Books</p>
                                </div>
                                <div className="studentContentItem"> 
                                    <p className='studentContentItemName'>PYQs</p>
                                </div>
                            </div>
                        
                    ):null}

                    {ViewAttendanceDashboard? (<AttendacePage onClose={()=> {
                        setWatchDashboard(true);
                        setViewAttendanceDashboard(false);
                    }} 
                    />

                    ):null}
                </div>
            </div>
            )}

            {isModalOpen && (
                <div className="studentModalOverlay" onClick={handleOutsideClick}>
                    <div className="studentModalContent">
                        <StudentUplaodImageComponent StudentData={data} />
                    </div>
                </div>
            )}
        </>
    );
}
