/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import "./AttendancePage.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays,faTrashCan ,faPenToSquare,faXmark,faCheck, faBan, faL} from '@fortawesome/free-solid-svg-icons';

import GetStudentAttendanceData from "../../../api/Dashboard Data/Student/GetStudentAttendanceData";
import EditSubject from "./Components/EditingSubject/EditSubject";

export default function AttendacePage({onClose,StudentRoll}) {
    const [roll, setRoll] = useState(StudentRoll)
    const [isLoading, setisLoading] = useState(true);
    const [RefrehAttendanceData,SetRefrehAttendanceData]= useState(0)
    const [AttendanceData, setAttendanceData]= useState({})
    const [NoData, setNoData] = useState(false)

    const [NoOfSubject, SetNoOfSubject] = useState(0)
    const [SubjectData, setSubjectData]= useState([])
    const [TotalClasses,SetTotalClasses] = useState(0)
    const [TotalClassesAttended,SetTotalClassesAttended] = useState(0)
    const [TotalClassesPercentage,SetTotalClassesPercentage] = useState(0)

    const [NewSubjectName,SetNewSubjectName]= useState()
    const [NewSubjectType,SetNewSubjectType]= useState(1)
    const [NewPresentData,SetNewPresentData]= useState()
    const [NewTotalData,SetNewTotalData]=useState()

    const [AddingSubject, setAddingSubject]=useState(false)
    const [AddingSubjectShowMsg, setAddingSubjectShowMsg]=useState(false)
    const [AddingSubjectMsg, setAddingSubjectMsg]=useState("")

    const [EditingSubjectData, SetEditingSubjectData]= useState(false)
    const [EditingCurrentSubjectData, SetEditingCurrentSubjectData]= useState()
    

    useEffect(() => {
      if (AttendanceData && AttendanceData.subjects) {
        ConfigureAttendanceData();
      }
    }, [AttendanceData]);


    function formatDateTime(timestamp) {
      // Convert the timestamp to a Date object
      const date = new Date(timestamp);
    
      // Define month names
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    
      // Get date components
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
    
      // Get time components
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
    
      // Determine AM/PM and adjust hours
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
    
      // Format the string
      return `${day} ${month} ${year}, ${hours}:${minutes} ${period}`;
    }

    function CalculatePercentage(data) {
      const PresentDates = data.TotalPresent;
      const AbsentDates = data.TotalAbsent;

      if(PresentDates==0 && AbsentDates==0){
        return 0;
      }
    
      const Percentage = (PresentDates / (PresentDates + AbsentDates)) * 100;
      return Percentage.toFixed(1);
    }
    
    


    const ConfigureAttendanceData = async () => {
      if (Array.isArray(AttendanceData.subjects)) {
        // Set the number of subjects
        SetNoOfSubject(AttendanceData.subjects.length);
        setSubjectData(AttendanceData.subjects)    
        // Calculate total and attended classes
        // Calculate total classes and total attended across all subjects
        const TotalsClass = AttendanceData.subjects.reduce((total, subject) => total + (subject.TotalPresent + subject.TotalAbsent), 0);
        const TotalAttended = AttendanceData.subjects.reduce((total, subject) => total + subject.TotalPresent, 0);
    
        // Calculate percentage
        const Percentage = TotalsClass > 0
          ? ((TotalAttended / TotalsClass) * 100).toFixed(2)
          : 0;
    
        // Update state
        SetTotalClasses(TotalsClass);
        SetTotalClassesAttended(TotalAttended);
        SetTotalClassesPercentage(Percentage);
      } else {
        console.warn("Invalid or missing subjects data.");
        SetNoOfSubject(0);
        SetTotalClasses(0);
        SetTotalClassesAttended(0);
        SetTotalClassesPercentage(0);
      }
    };
    
    


    useEffect(() => {
      setisLoading(true)
      const GetAttendance =async()=>{
        try{
          const AttendanceDataResponse = await GetStudentAttendanceData({roll:roll, getAttendance:true})
          if(AttendanceDataResponse.status==200){
            setAttendanceData(AttendanceDataResponse.data.data)
            setNoData(false)
          }else{
            console.log(AttendanceDataResponse)
            setNoData(true)
          }
        }finally{
          setisLoading(false)
        }
      }
      GetAttendance()
    
    }, [RefrehAttendanceData,roll])


    const StartMonitoringHandeller = async()=>{
      setisLoading(true)
      try{
        const StartMonitoringAttendanceStatus = await GetStudentAttendanceData({roll:StudentRoll,startMonitoring:true})
        if(StartMonitoringAttendanceStatus.status==200){
          setNoData(false)
          setAttendanceData(StartMonitoringAttendanceStatus)
          SetRefrehAttendanceData((val)=> val + 1)
        }else{
          setNoData(true)
        }
      }finally{
        setisLoading(false)
      }
    }

    const AddSubjectHandeller = async()=>{
      setisLoading(true)
      try{
        const SubjectAddStatus = await GetStudentAttendanceData({
          addSubject:true, 
          roll:roll,
          subjectName:NewSubjectName,
          subjectType:NewSubjectType,
          TotalPresent:Number(NewPresentData)||0,
          TotalClass:Number(NewTotalData)||0
        })
        if(SubjectAddStatus.status==200){
          setAttendanceData(SubjectAddStatus.data.data)
          setAddingSubject(false)
          setAddingSubjectShowMsg(false)
          SetNewSubjectName()
          SetNewSubjectType(1)
          SetNewPresentData()
          SetNewTotalData()
        }else{
          setAddingSubjectMsg(SubjectAddStatus.response.data.msg)
          setAddingSubjectShowMsg(true)
        }
      }finally{
        setisLoading(false)
      }
    }


    const MarkStudentPresentHandeller= useCallback(async({subjectName})=>{
      setisLoading(true)
      try{
        const Response = await GetStudentAttendanceData({roll:StudentRoll,
          subjectName:subjectName,
          updateAttendance:true,
          markPresent:true});
        if(Response.status == 200){
          setAttendanceData(Response.data.data)
        }
      }finally{
        setisLoading(false)
      }
    })

    const MarkStudentAbsentHandeller= useCallback(async({subjectName})=>{
      setisLoading(true)
      try{
        const Response = await GetStudentAttendanceData({roll:StudentRoll,
          subjectName:subjectName,
          updateAttendance:true,
          markAbsent:true});
        if(Response.status == 200){
          setAttendanceData(Response.data.data)
        }
      }finally{
        setisLoading(false)
      }
    })

    const RemoveMarkStudentHandeller= useCallback(async({subjectName})=>{
      setisLoading(true)
      try{
        const Response = await GetStudentAttendanceData({roll:StudentRoll,
          subjectName:subjectName,
          updateAttendance:true,
          removeMark:true});
        if(Response.status == 200){
          setAttendanceData(Response.data.data)
        }
      }finally{
        setisLoading(false)
      }
    })


    const SubjectDeleteHandeller= useCallback(async({subjectName})=>{
      setisLoading(true)
      try{
        const Response = await GetStudentAttendanceData({roll:StudentRoll,
          subjectName:subjectName,
          deleteSubject:true,
          
        });
        if(Response.status == 200){
          setAttendanceData(Response.data.data)
        }
      }finally{
        setisLoading(false)
      }
    })


    const NewPresentDataChangeHandeller=useCallback((e)=>{
      SetNewPresentData(e.target.value)
    })

    const NewTotalDataChangeHandeller=useCallback((e)=>{
      SetNewTotalData(e.target.value)
    })



    
  return (<div className="AttendaceContentArea">
    {isLoading? 
      <div className="loaderSpinnerbackground">
        <div className="LoaderSpinner"></div>
      </div>
    : null}

    {EditingSubjectData? <EditSubject onClose={()=>SetEditingSubjectData(false)} data={EditingCurrentSubjectData} roll={StudentRoll} UpdateData={(data)=>setAttendanceData(data)}/> :null}


    <div
      className="DashboardRedirectionButton"
      onClick={onClose}>
      ← Back
    </div>
    <h2 className="AttendanceMonitorHeader">ATTENDANCE MONITORING</h2>

    {NoData ? (
        <div className="NoAttendanceDataWrapper">
          <h1 className="NoAttendanceDataHeader">No Data Found</h1>
          <button className="StartMonitoringButton" onClick={StartMonitoringHandeller} >
            Start Monitoring Attendance
          </button>
        </div>
    ) : ( NoOfSubject==0 ? (
          <>
            <div className="AttendanceDetailsArea">
              <span>Total Class:{TotalClasses}</span>
              <span>Present: {TotalClassesAttended}</span>
              <span>Percentage: {TotalClassesPercentage} %</span>
            </div>
            <h1 className="noSubjectHeader">No Subjects Found</h1>


            {AddingSubject? ( <>
          <div className="AddingSubjectContainer">
              <span className="AddingSubjectContainerHeader">ADD A SUBJECT</span>
              <div className="AddingSubjectContainerNameInputArea">
                <label className="AddingSubjectContainerLabel">
                  NAME:
                  <input type="text" className="AddingSubjectContainerInput" placeholder="Example:- Mathematics" value={NewSubjectName} onChange={(e)=>SetNewSubjectName(e.target.value)}/>
                </label>
              </div>
              <div className="AddingSubjectContainerSubjectTypeArea">
                <label className="AddingSubjectContainerLabel">
                  SUBJECT TYPE:
                  <select className="AddingSubjectContainerSelect" value={NewSubjectType} onChange={(e)=>SetNewSubjectType(e.target.value)}>
                    <option value="1">Theory</option>
                    <option value="2">Lab</option>
                  </select>
                </label>
              </div>
              <div className="AddingSubjectContainerHeader2">
                Existing Attendance Data? (IGNORE IF ADDING A NEW SUBJECT)
              </div>
              <div className="AddingSubjectContainerAttendanceDataArea">
                <label className="AddingSubjectContainerLabel">
                  PRESENT
                  <input type="text" className="AddingSubjectContainerInput" value={NewPresentData} onChange={(e)=>NewPresentDataChangeHandeller(e)} placeholder="Example: 10"/>
                </label>
                <label className="AddingSubjectContainerLabel">
                  Total
                  <input type="text" className="AddingSubjectContainerInput" value={NewTotalData} onChange={(e)=>NewTotalDataChangeHandeller(e)} placeholder="Example: 15"/>
                </label>
              </div>


              {AddingSubjectShowMsg? (
                <div className="AddingSubjectContainerMsgSection">
                  {AddingSubjectMsg}
                </div>): null}

              <div className="AddingSubjectContainerButtonSection">
                <button className="AddingSubjectContainerButtonSectionCancelButton" onClick={()=>setAddingSubject(false)}>CANCEL</button>
                <button className="AddingSubjectContainerButtonSectionAddButton" onClick={AddSubjectHandeller}>ADD</button>
              </div>
            </div>

        </> ): null}


            <button className="addSubjectButton" disabled={AddingSubject} onClick={()=> setAddingSubject(true)}>Add a Subject</button>
          </>
      ): (
        <>
        <div className="AttendanceDetailsArea">
            <span>Total Class: {TotalClasses}</span>
            <span>Present: {TotalClassesAttended}</span>
            <span>Percentage: {TotalClassesPercentage} %</span>
        </div>
        <div className="AttendancaAndSubjectsArea">
        {SubjectData.map((data)=>(
          <div key={data._id} className="AttendanceSubjectCard">
            <div className="AttendanceSubjectCardDetails">
              <span className="AttendanceSubjectCardDetailsName">{data.name}</span>
              <span className="AttendanceSubjectCardDetailsSubjectType">Subject Type: {data.subjectType==1? "Theory": "Lab"} </span>
              <span className="AttendanceSubjectCardDetailsDatesDetails">Started on: {formatDateTime(data.startDate)}</span>
              <span className="AttendanceSubjectCardDetailsDatesDetails">Last Updated: {formatDateTime(data.LastUpdated)}</span>
            </div>

            <div className="AttendanceSubjectCardAttendance">
              <div className="AttendanceSubjectCardAttendanceData">
                <span>
                  Total Class: {data.TotalAbsent + data.TotalPresent|| 0}
                </span>
                <span>
                  Present: {data.TotalPresent || 0 }
                </span>
                <span>
                  Absent: {data.TotalAbsent || 0 }
                </span>
              </div>
              

              <span className={`AttendanceSubjectCardAttendanceDataPercentage ${CalculatePercentage(data)>=75?"AttendacePass":"AttendanceLow"}`}>
                  {CalculatePercentage(data)}
              </span>
            </div>

            <div className="AttendanceSubjectCardOptionsArea">
              <div className="AttendanceSubjectCardOptions" title="View Attendance Calender"><FontAwesomeIcon icon={faCalendarDays} /> </div>
              <div className="AttendanceSubjectCardOptions" title="Edit Subject" onClick={()=>{
                SetEditingCurrentSubjectData(data,StudentRoll)
                SetEditingSubjectData(true)
              }}><FontAwesomeIcon icon={faPenToSquare} /></div>
              <div className="AttendanceSubjectCardOptions" title="Delete Subject" onClick={()=>SubjectDeleteHandeller({subjectName:data.name})}><FontAwesomeIcon icon={faTrashCan} /></div>
            </div>

            <div className="AttendanceSubjectCardTodaysAttendanceArea">
              <span className="AttendanceSubjectCardTodaysAttendanceHeader">
                TODAY
              </span>
              <span className={`AttendanceSubjectCardTodaysAttendanceStatus 
                  ${data.PresentDates?.some(date => new Date(date).toDateString() === new Date().toDateString()) 
                    ? "StatusPresent" 
                    : data.AbsentDates?.some(date => new Date(date).toDateString() === new Date().toDateString()) 
                    ? "StatusAbsent" 
                    : "StatusNotMarked"
               }`}>
                Status: {
                  data.PresentDates?.some(date => new Date(date).toDateString() === new Date().toDateString())
                    ? "Present"
                    : data.AbsentDates?.some(date => new Date(date).toDateString() === new Date().toDateString())
                    ? "Absent"
                    : "Not Marked"
                    }
                </span>

              <div className="AttendanceSubjectCardTodaysAttendanceOptions">
                <div className="AttendanceSubjectCardTodaysAttendanceOptionsPresent" title="Mark Present" onClick={()=>MarkStudentPresentHandeller({subjectName:data.name})}><FontAwesomeIcon icon={faCheck} /></div>
                <div className="AttendanceSubjectCardTodaysAttendanceOptionsRemove" title="Remove Mark" onClick={()=>RemoveMarkStudentHandeller({subjectName:data.name})}><FontAwesomeIcon icon={faBan} /> </div>
                <div className="AttendanceSubjectCardTodaysAttendanceAbsent" title="Mark Absent" onClick={()=>MarkStudentAbsentHandeller({subjectName:data.name})}><FontAwesomeIcon icon={faXmark} /></div>
              </div>
            </div>
          </div>
        ))}
        </div>

        <div className="AttendaaceSubjectButtonDivider"></div>
        {AddingSubject? ( <>
          <div className="AddingSubjectContainer">
              <span className="AddingSubjectContainerHeader">ADD A SUBJECT</span>
              <div className="AddingSubjectContainerNameInputArea">
                <label className="AddingSubjectContainerLabel">
                  NAME:
                  <input type="text" className="AddingSubjectContainerInput" placeholder="Example:- Mathematics" value={NewSubjectName} onChange={(e)=>SetNewSubjectName(e.target.value)}/>
                </label>
              </div>
              <div className="AddingSubjectContainerSubjectTypeArea">
                <label className="AddingSubjectContainerLabel">
                  SUBJECT TYPE:
                  <select className="AddingSubjectContainerSelect" value={NewSubjectType} onChange={(e)=>SetNewSubjectType(e.target.value)}>
                    <option value="1">Theory</option>
                    <option value="2">Lab</option>
                  </select>
                </label>
              </div>
              <div className="AddingSubjectContainerHeader2">
                Existing Attendance Data? (IGNORE IF ADDING A NEW SUBJECT)
              </div>
              <div className="AddingSubjectContainerAttendanceDataArea">
                <label className="AddingSubjectContainerLabel">
                  PRESENT
                  <input type="text" className="AddingSubjectContainerInput" value={NewPresentData} onChange={(e)=>NewPresentDataChangeHandeller(e)} placeholder="Example: 10"/>
                </label>
                <label className="AddingSubjectContainerLabel">
                  Total
                  <input type="text" className="AddingSubjectContainerInput" value={NewTotalData} onChange={(e)=>NewTotalDataChangeHandeller(e)} placeholder="Example: 15"/>
                </label>
              </div>


              {AddingSubjectShowMsg? (
                <div className="AddingSubjectContainerMsgSection">
                  {AddingSubjectMsg}
                </div>): null}

              <div className="AddingSubjectContainerButtonSection">
                <button className="AddingSubjectContainerButtonSectionCancelButton" onClick={()=>setAddingSubject(false)}>CANCEL</button>
                <button className="AddingSubjectContainerButtonSectionAddButton" onClick={AddSubjectHandeller}>ADD</button>
              </div>
            </div>

        </> ): null}

        <button className="addSubjectButton" disabled={AddingSubject} onClick={()=> setAddingSubject(true)}>Add a Subject</button>
        </>

      )
    )
    }

  </div>)
}
