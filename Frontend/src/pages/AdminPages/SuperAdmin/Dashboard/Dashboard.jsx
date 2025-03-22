import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Dashboard.css'
import BasicNavbar from '../../../../components/basicNavbar/basicNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

import Loader from '../../../../components/loader/loader';
import Unauthorized from '../../../../components/Errors/Unauthorized';

import SuperAdminAuth from '../../../../api/Auth/SuperAdminAuth';


export default function SuperAdminDashboard() {
    const navigate =useNavigate()

    const [isLoading, setisLoading] = useState(false);
    const [Authorized, setAuthorized] = useState(false);


    useEffect(() => {
        const CheckAuth = async ()=>{
            setisLoading(true)
            try{
                const SuperAdminAuthData =await SuperAdminAuth()
                if(SuperAdminAuthData.status==200){
                    setAuthorized(true)
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
    

    const LogOutHandeller = async () => {
        setisLoading(true);
        localStorage.removeItem('aot-student-login-authorization-token');
        navigate('/login');
    };

    return (
        <>
        <BasicNavbar />
        {isLoading?<Loader/>:null}
        {Authorized?null:<Unauthorized/>}
            <div className="DashboardMainArea">
                <div className="TopAreaDashboard">
                    <span className="SuperAdminHeaders">
                        <span className="SuperAdminHeader">WELCOME SUPER ADMIN</span>
                        <span className="SuperAdminSubHeader">DASHBOARD CONTROL</span>
                    </span>
                    <button className="SuperAdminLogOutFeature" onClick={LogOutHandeller}>LOG OUT  {<FontAwesomeIcon icon={faArrowUpRightFromSquare}/>}</button>
                </div>

                <div className="HomePageModificationArea">
                    <h2 className="HomePageModificationAreaHeader">MODIFY HOME PAGE DATA</h2>
                    <div className="HomePageModificationControlOptionsArea">
                        <div className="HomePageModificationControlOptions" onClick={()=> navigate('/super-admin/admin-dashboard/mastersection')}>MASTER SECTION</div>
                        <div className="HomePageModificationControlOptions" >NOTICES</div>
                        <div className="HomePageModificationControlOptions" >EVENTS</div>
                        <div className="HomePageModificationControlOptions" >ACHEIVEMENTS</div>
                        <div className="HomePageModificationControlOptions" >FACILITIES</div>
                        <div className="HomePageModificationControlOptions" >FACULTY DETAILS</div>
                        <div className="HomePageModificationControlOptions">MESSAGES</div>
                        <div className="HomePageModificationControlOptions">FAQs</div>
                        <div className="HomePageModificationControlOptions">FOOTER INFO</div>
                    </div>
                </div>

                <div className="StudentControlsSectionArea">
                    <h2 className="StudentControlsSectionHeader">STUDENT CONTROL</h2>
                    <div className='StudentControlsSectionOptionsArea'>
                        <div className="StudentControlsSectionOptions" onClick={()=> navigate('/super-admin/admin-dashboard/add-student')}>ADD STUDENT</div>
                        <div className="StudentControlsSectionOptions" onClick={()=> navigate('/super-admin/admin-dashboard/view-or-edit-student')}>VIEW OR EDIT STUDENT</div>
                        <div className="StudentControlsSectionOptions"  onClick={()=> navigate('/super-admin/admin-dashboard/student-attendance')}>ATTENDENEC ANALYTICS</div>
                    </div>
                </div>

                <div className="FacultyControlsSectionArea">
                    <h2 className="FacultyControlsSectionHeader">FACULTY CONTROL</h2>
                    <div className='FacultyControlsSectionOptionsArea'>
                        <div className="FacultyControlsSectionOptions">ADD FACULTY</div>
                        <div className="FacultyControlsSectionOptions">VIEW OR EDIT FACULTY</div>
                        <div className="FacultyControlsSectionOptions">LECTURE ANALYTICS</div>
                    </div>
                </div>

                <div className="ReprotsAnalyticsControlsSectionArea">
                    <h2 className="ReprotsAnalyticsControlsSectionHeader">REPORTS AND ANALYTICS</h2>
                    <div className='ReprotsAnalyticsControlsSectionOptionsArea'>
                        <div className="ReprotsAnalyticsControlsSectionOptions">FEE COLLECTION</div>
                        <div className="ReprotsAnalyticsControlsSectionOptions">SALARY DISTRIBUTION</div>
                        <div className="ReprotsAnalyticsControlsSectionOptions"> 3rd PARTY EXPENSES</div>
                        <div className="ReprotsAnalyticsControlsSectionOptions"> LECTURE vs ATTENDANCE</div>
                        <div className="ReprotsAnalyticsControlsSectionOptions"> STUDENT PERFORMANCE REPORTS</div>
                        <div className="ReprotsAnalyticsControlsSectionOptions"> FACULTY PERFORMANCE REPORTS</div>
                    </div>
                </div>
                
            </div>
        </>
    );
}
