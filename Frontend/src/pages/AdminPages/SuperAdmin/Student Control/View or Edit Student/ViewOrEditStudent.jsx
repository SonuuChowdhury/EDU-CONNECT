import './ViewOrEditStudent.css'
import '../../Dashboard/Dashboard.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faEye, faPenToSquare,faTrashCan } from '@fortawesome/free-solid-svg-icons'

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
