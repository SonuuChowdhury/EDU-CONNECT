/* eslint-disable no-unused-vars */
import './StudentAttendanceAnalytics.css';
import '../../Dashboard/Dashboard.css';

import TryAgainTopBarPopup from '../../../../../components/tryAgain/tryAgain.jsx'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../../../../components/loader/loader.jsx';
import Unauthorized from '../../../../../components/Errors/Unauthorized.jsx';

import BasicNavbar from '../../../../../components/basicNavbar/basicNavbar.jsx';
import SuperAdminAuth from '../../../../../api/Auth/SuperAdminAuth.js';

import GetAllStudentsAttendaceData from '../../../../../api/Student Control APIs/GetAllStudentsAttendaceData.js';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function AdminStudentAttendanceAnalytics() {
    const [errorStatus, setErrorStatus] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [ShowTopUp, SetShowTopUp] = useState(false)

    const [isLoading, setisLoading] = useState(false);
    const [Authorized, setAuthorized] = useState(false);
    const [StudentAttendaceData, setStudentAttendaceData] = useState([])
    const [expandedCard, setExpandedCard] = useState(null);

    const navigate = useNavigate();

    const toggleCard = (roll) => {
        setExpandedCard(expandedCard === roll ? null : roll);
    };


    useEffect(() => {
        if (ShowTopUp) {
            const timer = setTimeout(() => {
                SetShowTopUp(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [ShowTopUp]);


    useEffect(() => {
        const CheckAuth = async ()=>{
            setisLoading(true)
            try{
                const SuperAdminAuthData =await SuperAdminAuth()
                if(SuperAdminAuthData.status==200){
                    await setAuthorized(true)
                }else{
                    setAuthorized(false)
                }
            }catch(err){
                console.log(err)
            }finally{
                setisLoading(false)
            }
        }
        CheckAuth()
    },[])

    
    useEffect(() => {
        if(Authorized){
        const GetAttendanceData = async ()=>{
            setisLoading(true)
            try{
                const AttendanceDataResponse =await GetAllStudentsAttendaceData()
                if(AttendanceDataResponse.status==200){
                    setStudentAttendaceData(AttendanceDataResponse.data.data)
                    console.log(AttendanceDataResponse.data.data)
                }
            }catch(err){
                console.log(err)
            }finally{
                setisLoading(false)
            }
        }
        GetAttendanceData()}
    },[Authorized])


    

    return (
        <>
            <BasicNavbar />
            {isLoading ? <Loader /> : null}
            {Authorized ? null : <Unauthorized />}
            {ShowTopUp ? <TryAgainTopBarPopup status={errorStatus} msg={errorMsg}/> : null}

            <div className="TopAreaDashboard">
                <span className="SuperAdminHeaders">
                    <span className="SuperAdminHeader">WELCOME SUPER ADMIN</span>
                    <span className="SuperAdminSubHeader">STUDENT ATTENDANCE ANALYTICS</span>
                </span>
                <button className="SuperAdminLogOutFeature" onClick={() => navigate('/super-admin/admin-dashboard')}>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Dashboard
                </button>
            </div>

            <div className="student-list">
            {StudentAttendaceData.map((student) => {
                const totalClasses = student.attendance.reduce(
                    (acc, subj) => acc + subj.TotalPresent + subj.TotalAbsent,
                    0
                );
                const totalPresent = student.attendance.reduce(
                    (acc, subj) => acc + subj.TotalPresent,
                    0
                );
                const attendancePercentage = Math.round((totalPresent / totalClasses) * 100);

                const labs = student.attendance.filter((subj) => subj.subjectType === 2);
                const theories = student.attendance.filter((subj) => subj.subjectType === 1);

                return (
                    <div key={student.roll} className="student-card">
                        {/* Profile Section */}
                        <div className="profile-section">
                            <img
                                src={
                                    student.isProfile
                                        ? student.profile
                                        : `/defaultProfile.jpg`
                                }
                                alt={`${student.name}'s profile`}
                                className="profile-picture"
                            />
                            <div className="student-info">
                                <h3>{student.name}</h3>
                                <p>Roll: {student.roll}</p>
                                <p>Department: {student.department}</p>
                                <p>Semester: {student.semester}</p>
                            </div>
                            {/* Attendance Circular Progress */}
                            <div className="attendance-wheel">
                                <CircularProgressbar
                                    value={attendancePercentage}
                                    text={`${attendancePercentage}%`}
                                    styles={buildStyles({
                                        textColor: '#000',
                                        pathColor: attendancePercentage >= 75 ? 'green' : 'red',
                                        trailColor: '#d6d6d6',
                                    })}
                                />
                            </div>
                        </div>

                        {/* Dropdown for Subjects */}
                        <button
                            className="dropdown-toggle"
                            onClick={() => toggleCard(student.roll)}
                        >
                            {expandedCard === student.roll ? 'Hide Details' : 'View Details'}
                        </button>

                        {expandedCard === student.roll && (
                            <div className="subjects-section">
                                {/* Theory Subjects */}
                                <div className="subject-category">
                                    <h4>Theory Subjects</h4>
                                    {theories.map((subject, index) => (
                                        <div key={index} className="subject-item">
                                            <span>{subject.name}</span>
                                            <span>
                                                Present: {subject.TotalPresent}, Absent:{' '}
                                                {subject.TotalAbsent}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Lab Subjects */}
                                <div className="subject-category">
                                    <h4>Lab Subjects</h4>
                                    {labs.map((subject, index) => (
                                        <div key={index} className="subject-item">
                                            <span>{subject.name}</span>
                                            <span>
                                                Present: {subject.TotalPresent}, Absent:{' '}
                                                {subject.TotalAbsent}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
            
        </>
    );
}
