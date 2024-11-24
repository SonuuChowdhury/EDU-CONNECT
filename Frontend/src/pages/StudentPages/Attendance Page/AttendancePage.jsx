/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import "./AttendancePage.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays,faTrashCan ,faPenToSquare,faXmark,faCheck, faBan} from '@fortawesome/free-solid-svg-icons';

import GetStudentAttendanceData from "../../../api/Dashboard Data/Student/GetStudentAttendanceData";

export default function AttendacePage({onClose,StudentRoll}) {
    const [roll, setRoll] = useState(StudentRoll)
    const [isLoading, setisLoading] = useState(true);
    const [RefrehAttendanceData,SetRefrehAttendanceData]= useState(0)
    const [AttendanceData, setAttendanceData]= useState({})
    const [NoData, setNoData] = useState(false)

    const [AddingSubject, setAddingSubject]=useState(false)

    const [NoOfSubject, SetNoOfSubject] = useState(0)
    const [SubjectData, setSubjectData]= useState([])
    const [TotalClasses,SetTotalClasses] = useState(0)
    const [TotalClassesAttended,SetTotalClassesAttended] = useState(0)
    const [TotalClassesPercentage,SetTotalClassesPercentage] = useState(0)

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
      const PresentDates = data.PresentDates.length;
      const AbsentDates = data.AbsentDates.length;
    
      const Percentage = (PresentDates / (PresentDates + AbsentDates)) * 100;
      return Percentage.toFixed(1); // Ensures 1 digit after the decimal point
    }
    
    


    const ConfigureAttendanceData = async () => {
      if (Array.isArray(AttendanceData.subjects)) {
        // Set the number of subjects
        SetNoOfSubject(AttendanceData.subjects.length);
        setSubjectData(AttendanceData.subjects)    
        // Calculate total and attended classes
        const TotalsClass = AttendanceData.subjects.reduce(
          (sum, subject) => sum + (subject.PresentDates?.length || 0) + (subject.AbsentDates?.length || 0),
          0
        );
        const TotalAttended = AttendanceData.subjects.reduce(
          (sum, subject) => sum + (subject.PresentDates?.length || 0),
          0
        );
    
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
          SetRefrehAttendanceData((val)=> val++)
          console.log(StartMonitoringAttendanceStatus)
        }else{
          setNoData(true)
        }
      }finally{
        setisLoading(false)
      }
    }

    const AddSubjectHandeller = async()=>{
      const SubjectAddStatus = await GetStudentAttendanceData({addSubject:true})
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

    
  return (<div className="AttendaceContentArea">
    {isLoading? 
      <div className="loaderSpinnerbackground">
        <div className="LoaderSpinner"></div>
      </div>
    : null}
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
            <button className="addSubjectButton">Add a Subject</button>
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
                  Total Class: {data.PresentDates?.length + data.AbsentDates?.length|| 0}
                </span>
                <span>
                  Present: {data.PresentDates?.length || 0 }
                </span>
                <span>
                  Absent: {data.AbsentDates?.length || 0 }
                </span>
              </div>
              

              <span className={`AttendanceSubjectCardAttendanceDataPercentage ${CalculatePercentage(data)>=75?"AttendacePass":"AttendanceLow"}`}>
                  {CalculatePercentage(data)}
              </span>
            </div>

            <div className="AttendanceSubjectCardOptionsArea">
              <div className="AttendanceSubjectCardOptions"><FontAwesomeIcon icon={faCalendarDays} /> </div>
              <div className="AttendanceSubjectCardOptions"><FontAwesomeIcon icon={faPenToSquare} /></div>
              <div className="AttendanceSubjectCardOptions"><FontAwesomeIcon icon={faTrashCan} /></div>
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
                <div className="AttendanceSubjectCardTodaysAttendanceOptionsPresent" onClick={()=>MarkStudentPresentHandeller({subjectName:data.name})}><FontAwesomeIcon icon={faCheck} /></div>
                <div className="AttendanceSubjectCardTodaysAttendanceOptionsRemove" onClick={()=>RemoveMarkStudentHandeller({subjectName:data.name})}><FontAwesomeIcon icon={faBan} /> </div>
                <div className="AttendanceSubjectCardTodaysAttendanceAbsent" onClick={()=>MarkStudentAbsentHandeller({subjectName:data.name})}><FontAwesomeIcon icon={faXmark} /></div>

              </div>

            </div>



          </div>
        ))}
        </div>

        <div className="AttendaaceSubjectButtonDivider"></div>
        <button className="addSubjectButton">Add a Subject</button>
        </>

      )


    )
    
    }

  </div>)
}
