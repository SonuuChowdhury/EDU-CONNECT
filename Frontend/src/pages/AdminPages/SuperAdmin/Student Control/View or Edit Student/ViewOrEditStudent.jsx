import './ViewOrEditStudent.css'
import '../../Dashboard/Dashboard.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faArrowUpRightFromSquare, faEye, faPenToSquare,faTrashCan } from '@fortawesome/free-solid-svg-icons'

import BasicNavbar from '../../../../../components/basicNavbar/basicNavbar'
import Loader from '../../../../../components/loader/loader'
import TryAgainTopBarPopup from '../../../../../components/tryAgain/tryAgain'
import Unauthorized from '../../../../../components/Errors/Unauthorized'
import DataNotFound from '../../../../../components/Data Not found/DataNotFound.jsx'

import GetAllStudentsData from '../../../../../api/Student Control APIs/GetAllStudentsData.js'

import ViewStudentCard from './components/View Student Card/ViewStudentCard.jsx'
import DeleteStudentOptionBox from './components/Delete Student/DeleteStudentDialogPopUp.jsx'

export default function StudentViewOrEditEditor(){
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [StudentViewOrEditData, setStudentViewOrEditData] = useState([])
    const [errorStatus, setErrorStatus] = useState(null);
    const [ShowTopUp, SetShowTopUp] = useState(false)
    const [Authorized, setAuthorized] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const [dataEmpty, setDataEmpty] = useState(false)


    const [SelectedStudentViewPopUpData, setSelectedStudentViewPopUpData] = useState('')
    const [SelectedStudentDeletePopUpData, setSelectedStudentDeletePopUpData] = useState('')

    const [isViewStudentPopupOpen, setIsViewStudentPopupOpen] = useState(false);
    const [isDeleteStudentPopupOpen, setIsDeleteStudentPopupOpen] = useState(false);

    const openViewStudentPopup = (data) => {
        setSelectedStudentViewPopUpData(data)
        setIsViewStudentPopupOpen(true)
    }

    const openDeleteStudentPopup = (data) => {
        setSelectedStudentDeletePopUpData(data)
        setIsDeleteStudentPopupOpen(true)

    }

    const closePopup = () => {
        setIsViewStudentPopupOpen(false)
        setIsDeleteStudentPopupOpen(false)

        
    };

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const data = await GetAllStudentsData(0);
                if (data.status === 403) {
                    setAuthorized(false);
                } else if (data.status === 200) {
                    setStudentViewOrEditData(data.data);
                    if (((data.data).length) === 0) {
                        setDataEmpty(true)
                    }
                } else {
                    setErrorStatus(500);
                    SetShowTopUp(true)
                }
            } catch (err) {
                console.log(err);
                if (err.status == 403) {
                    setAuthorized(false)
                }
                setErrorStatus(500);
                SetShowTopUp(true)
            } finally {
                setIsLoading(false);
            }
        };

        getData();
    }, [refresh]);

    useEffect(() => {
        if (ShowTopUp) {
            const timer = setTimeout(() => {
                SetShowTopUp(false);
                setRefresh(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [ShowTopUp, refresh]);


    function formatISODate(isoDate) {
        const date = new Date(isoDate);

        if(!isoDate){
            return false
        }
    
        // Array of month names
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
    
        // Extract parts of the date
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
    
        // Extract and format time
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
    
        // Format the final string
        return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
    }
    

    return <>
        <BasicNavbar/>
        {isLoading ? <Loader/> : null}
        {Authorized ? null : <Unauthorized/>}
        {ShowTopUp ? <TryAgainTopBarPopup status={errorStatus}/> : null}

        <div className="TopAreaDashboard">
            <span className="SuperAdminHeaders">
                <span className="SuperAdminHeader">WELCOME SUPER ADMIN</span>
                <span className="SuperAdminSubHeader">STUDENT VIEW/EDIT SECTION</span>
            </span>
            <button className="SuperAdminLogOutFeature" onClick={() => navigate('/super-admin/admin-dashboard')}>
                {<FontAwesomeIcon icon={faArrowUpRightFromSquare}/>} Dashboard
            </button>
        </div>

        <div className="StudentViewOrEditControlSectionArea">
            <div className="StudentViewOrEditControlSection">
                <div className="StudentViewOrEditControlSectionControlsandSearchSection">
                    <button title='Bulk Edit' className="StudentViewOrEditControlSectionControlsandSearchSectionBulkEdit">
                        <FontAwesomeIcon icon={faPenToSquare} className='StudentViewOrEditControlSectionicon' />Bulk Edit
                    </button>
                    <button title='Send Notice'
                    className="StudentViewOrEditControlSectionControlsandSearchSectionSendNotice">
                        <FontAwesomeIcon icon={faEnvelope} className='StudentViewOrEditControlSectionicon'/>Send Notice
                    </button>
                </div>

                <div className="StudentViewOrEditControlSectionSearchArea">
                    <span className="StudentViewOrEditControlSectionSearchAreaSearchText">Search Student</span>
                    <input type="text" className="StudentViewOrEditControlSectionSearchAreaSearchBox" title='Enter Student Name...' placeholder='Enter Student Name...' />
                </div>

                <div className="StudentViewOrEditControlSectionFilterAndExportArea">
                    <span className="StudentViewOrEditControlSectionFilterAndExportLabel">
                        Apply Filters:
                    </span>
                    <div className="StudentViewOrEditControlSectionFilterAndExportSemFilter">
                        <span className='StudentViewOrEditControlSectionFilterAndExportLabel'>Semester</span>
                        <select className='StudentViewOrEditControlSectionFilterAndExportDropdown'> 
                            <option value="0">Sem</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>

                    <div className="StudentViewOrEditControlSectionFilterAndExportDeptFilter">
                        <span className='StudentViewOrEditControlSectionFilterAndExportLabel'>Department</span>
                        <select className='StudentViewOrEditControlSectionFilterAndExportDropdown'> 
                            <option value="0">Dept</option>
                            <option value="1">EEE</option>
                            <option value="2">ECE</option>
                            <option value="3">CSE</option>
                            <option value="4">CSBS</option>
                            <option value="5">ME</option>
                            <option value="6">EE</option>
                        </select>
                    </div>

                    <button className="StudentViewOrEditControlSectionFilterAndExportButton">
                        Export as XLS
                    </button>
                </div>
            </div>
        </div>

        


        <div className="StudentViewOrEditListSection">
            {StudentViewOrEditData.map((data, index)=>{
                return(
                    <div className="StudentViewOrEditListItem" key={index}>
                        <div className="StudentViewOrEditListItemProfilePhoto" style={data.isProfile? {backgroundImage:`url(${data.profile})`} : {backgroundImage:`url('/defaultProfile.jpg')`}}/>

                        <div className="StudentViewOrEditListDetailsSection">
                            <span className="StudentViewOrEditListDetailsName">
                                {data.name}
                            </span>

                            <span className="StudentViewOrEditListDetailsRoll">
                                {data.roll}
                            </span>

                            <span className="StudentViewOrEditListDetailsDepartment">
                                {data.department}
                            </span>
                        </div>

                        <div className="StudentViewOrEditListLoginDetails">
                            <span className="StudentViewOrEditListLoginDetailsLastLogin">
                                Last Login: {formatISODate(data.lastLogin) || "No Data"}
                            </span>
                            <span className="StudentViewOrEditListLoginDetailsJoined">
                                Joined: {formatISODate(data.joined) || "No Data"}
                            </span>
                        </div>


                        <div className="StudentViewOrEditListDetailsControlButtonsArea">
                            <div className="StudentViewOrEditListDetailsControlViewButton">
                                {<FontAwesomeIcon icon={faEye} className='StudentViewOrEditListDetailsControlButtonIcon' onClick={()=>openViewStudentPopup(data)}/>}

                            </div>
                            <div className="StudentViewOrEditListDetailsControlEditButtons">
                                {<FontAwesomeIcon icon={faPenToSquare} className='StudentViewOrEditListDetailsControlButtonIcon'/>}                              
                            </div>
                            <div className="StudentViewOrEditListDetailsControlDeleteButtons">
                                {<FontAwesomeIcon icon={faTrashCan} className='StudentViewOrEditListDetailsControlButtonIcon' onClick={()=>openDeleteStudentPopup(data)}/>}  
                            </div>
                        </div>
                    </div>
                )

            })}

        </div>
        
        {dataEmpty ? <DataNotFound/> : null}

        <div className="StudentViewOrEditBorder"/>


        {isViewStudentPopupOpen ? (
        <ViewStudentCard 
            isOpen={isViewStudentPopupOpen} 
            onClose={closePopup} 
            data={SelectedStudentViewPopUpData} 
        />
        ) : null}

        {isDeleteStudentPopupOpen ? (
        <DeleteStudentOptionBox 
            isOpen={isDeleteStudentPopupOpen} 
            onClose={closePopup} 
            data={SelectedStudentDeletePopUpData} 
        />
        ) : null}

    </>
}
