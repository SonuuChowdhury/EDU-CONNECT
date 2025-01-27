/* eslint-disable no-unused-vars */
import './ViewOrEditStudent.css'
import '../../Dashboard/Dashboard.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as XLSX from "xlsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEnvelope, faArrowUpRightFromSquare, faEye, faPenToSquare,faTrashCan,faUser,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

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
    const [FetchedStudentViewOrEditData, setFetchedStudentViewOrEditData] = useState([])
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

    const [isExportDropdownVisible, setisExportDropdownVisible]=useState(false)

    const [searchValue,SetSearchValue]=useState("");
    const [semFilterValue, setSemFilterValue]= useState(0)
    const [DeptFilterValue, SetDeptFilterValue]= useState("0")

    const OnSearchInputChange=async(e)=>{
        SetSearchValue(e.target.value)
        const VarSearchValue=e.target.value;
        const SearchResults=FetchedStudentViewOrEditData.filter(student => 
            student.name.toLowerCase().includes(VarSearchValue.toLowerCase())
        );
        setStudentViewOrEditData(SearchResults)
        if(SearchResults.length==0){
            setDataEmpty(true)
        }else{
            setDataEmpty(false)
        }
    }

    const OnSemFilterValueChange=async(e)=>{
        setSemFilterValue(e.target.value)
        const SelectedSem= e.target.value;
        const FilterResult = FetchedStudentViewOrEditData.filter(student=>student.semester==SelectedSem)
        setStudentViewOrEditData(FilterResult)
        if(FilterResult.length==0){
            setDataEmpty(true)
        }else{
            setDataEmpty(false)
        }
        if(SelectedSem==0){
            setDataEmpty(false)
            setStudentViewOrEditData(FetchedStudentViewOrEditData)
        }
    }

    const OnDeptFilterValueChanged=(e)=>{
        SetDeptFilterValue(e.target.value)
        const SelectedDept= e.target.value;
        const FilterResult = FetchedStudentViewOrEditData.filter(student=>student.department.toLowerCase().includes(SelectedDept.toLowerCase()))
        setStudentViewOrEditData(FilterResult)
        console.log(FilterResult)
        if(FilterResult.length==0){
            setDataEmpty(true)
        }else{
            setDataEmpty(false)
        }
        if(SelectedDept==0){
            setDataEmpty(false)
            setStudentViewOrEditData(FetchedStudentViewOrEditData)
        }
    }

    const ExportAllStudentsToXLS = () => {
        const filteredData = FetchedStudentViewOrEditData.map(({ _id, isProfile, profile, __v, ...rest }) => rest);
        const ws = XLSX.utils.json_to_sheet(filteredData); // Convert JSON to Sheet
        const wb = XLSX.utils.book_new(); // Create a new workbook
    
        // Adjust column widths
        const columnWidths = [
            { wch: 14 }, // Width for "roll"
            { wch: 25 }, // Width for "name"
            { wch: 35 }, // Width for "department"
            { wch: 8 }, // Width for "year"
            { wch: 8 }, // Width for "semester"
            { wch: 35 }, // Width for "email"
            { wch: 15 }, // Width for "mobile"
            { wch: 45 }, // Width for "address"
            { wch: 25 }, // Width for "lastLogin"
        ];
        ws["!cols"] = columnWidths; // Apply column widths
    
        // Center align all cells
        const range = XLSX.utils.decode_range(ws["!ref"]);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                if (!ws[cellAddress]) continue;
    
                // Initialize cell style if not present
                if (!ws[cellAddress].s) ws[cellAddress].s = {};
    
                // Apply alignment styles
                ws[cellAddress].s.alignment = {
                    horizontal: "center",
                    vertical: "center",
                };
            }
        }
    
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Append the sheet to the workbook
    
        // Format date and time
        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        const formattedTime = now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        const timestamp = `${formattedDate}, ${formattedTime}`;
    
        // Export the workbook to an Excel file
        XLSX.writeFile(wb, `All_Students_${timestamp}.xlsx`);
        setisExportDropdownVisible(false)
    };

    const ExportFilteredStudentsToXLS = () => {
        const filteredData = StudentViewOrEditData.map(({ _id, isProfile, profile, __v, ...rest }) => rest);
        const ws = XLSX.utils.json_to_sheet(filteredData); // Convert JSON to Sheet
        const wb = XLSX.utils.book_new(); // Create a new workbook
    
        // Adjust column widths
        const columnWidths = [
            { wch: 14 }, // Width for "roll"
            { wch: 25 }, // Width for "name"
            { wch: 35 }, // Width for "department"
            { wch: 8 }, // Width for "year"
            { wch: 8 }, // Width for "semester"
            { wch: 35 }, // Width for "email"
            { wch: 15 }, // Width for "mobile"
            { wch: 45 }, // Width for "address"
            { wch: 25 }, // Width for "lastLogin"
        ];
        ws["!cols"] = columnWidths; // Apply column widths
    
        // Center align all cells
        const range = XLSX.utils.decode_range(ws["!ref"]);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
                if (!ws[cellAddress]) continue;
    
                // Initialize cell style if not present
                if (!ws[cellAddress].s) ws[cellAddress].s = {};
    
                // Apply alignment styles
                ws[cellAddress].s.alignment = {
                    horizontal: "center",
                    vertical: "center",
                };
            }
        }
    
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // Append the sheet to the workbook
    
        // Format date and time
        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        const formattedTime = now.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        const timestamp = `${formattedDate}, ${formattedTime}`;
    
        // Export the workbook to an Excel file
        XLSX.writeFile(wb, `Filtered_Students_${timestamp}.xlsx`);
        setisExportDropdownVisible(false)
    };
    

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
                    setFetchedStudentViewOrEditData(data.data);
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
                    <input type="text" value={searchValue} onChange={OnSearchInputChange} className="StudentViewOrEditControlSectionSearchAreaSearchBox" title='Enter Student Name...' placeholder='Enter Student Name...' />
                </div>

                <div className="StudentViewOrEditControlSectionFilterAndExportArea">
                    <span className="StudentViewOrEditControlSectionFilterAndExportLabel">
                        Apply Filters:
                    </span>
                    <div className="StudentViewOrEditControlSectionFilterAndExportSemFilter">
                        <span className='StudentViewOrEditControlSectionFilterAndExportLabel'>Semester</span>
                        <select value={semFilterValue} onChange={OnSemFilterValueChange} className='StudentViewOrEditControlSectionFilterAndExportDropdown'> 
                            <option value="0">All</option>
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
                        <select onChange={OnDeptFilterValueChanged} value={DeptFilterValue} className='StudentViewOrEditControlSectionFilterAndExportDropdown'> 
                            <option value="0">All</option>
                            <option value="Electrical and Electronics Engineering">EEE</option>
                            <option value="Electronics and Communication Engineering">ECE</option>
                            <option value="Computer Science Engineering">CSE</option>
                            <option value="Computer Science and Business Studies">CSBS</option>
                            <option value="Mechanical Engineering">ME</option>
                            <option value="Electrical Engineering">EE</option>
                        </select>
                    </div>

                    <div className='ExportToXLSButtonContainer'>

                    <button onClick={()=>setisExportDropdownVisible((val)=>!val)} className="StudentViewOrEditControlSectionFilterAndExportButton">
                        {isExportDropdownVisible?"Cancel":"Export as XLS"}
                    </button>
                    {isExportDropdownVisible && (
                        <div className="ExportToXLSButtonContent">
                        <ul className="ExportToXLSButtonList">
                            <li title='Export Details of all Students' onClick={ExportAllStudentsToXLS} className="ExportToXLSButtonItem"><FontAwesomeIcon icon={faUser} className='ExportButtonListIcons' /><span>All Students</span></li>
                            <li title='Export Details of Filtered Students' onClick={ExportFilteredStudentsToXLS} className="ExportToXLSButtonItem"><FontAwesomeIcon icon={faMagnifyingGlass} className='ExportButtonListIcons' /><span>Filtered Students</span></li>
                        </ul>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </div>

        

        {dataEmpty ? <DataNotFound/>:

        <div className="StudentViewOrEditListSection">
            {StudentViewOrEditData.map((data)=>{
                return(
                    <div className="StudentViewOrEditListItem" key={data.roll}>
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
                            <button className="StudentViewOrEditListDetailsControlViewButton" title='View Student'> 
                                {<FontAwesomeIcon icon={faEye} className='StudentViewOrEditListDetailsControlButtonIcon' onClick={()=>openViewStudentPopup(data)}/>}
                            </button>
                            <button className="StudentViewOrEditListDetailsControlEditButtons" title='Edit Student'>
                                {<FontAwesomeIcon icon={faPenToSquare} className='StudentViewOrEditListDetailsControlButtonIcon'/>}                              
                            </button>
                            <button className="StudentViewOrEditListDetailsControlDeleteButtons" title='Delete Student'>
                                {<FontAwesomeIcon icon={faTrashCan} className='StudentViewOrEditListDetailsControlButtonIcon' onClick={()=>openDeleteStudentPopup(data)}/>}  
                            </button>
                        </div>
                    </div>
                )

            })}

        </div>
        
        }

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
