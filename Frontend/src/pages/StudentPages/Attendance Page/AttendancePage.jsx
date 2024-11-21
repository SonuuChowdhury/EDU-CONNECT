/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./AttendancePage.css";

import GetStudentAttendanceData from "../../../api/Dashboard Data/Student/GetStudentAttendanceData";

import Loader from "../../../components/loader/loader";

export default function AttendacePage({onClose,StudentRoll}) {
    const [roll, setRoll] = useState(StudentRoll)
    const [isLoading, setisLoading] = useState(true);
    const [RefrehAttendanceData,SetRefrehAttendanceData]= useState(0)
    const [AttendanceData, setAttendanceData]= useState()
    const [NoData, setNoData] = useState(false)

    const [NoOfSubject, SetNoOfSubject] = useState(0)

    const ConfigureAttendanceData = async()=>{
      SetNoOfSubject(AttendanceData.data.subjects.length())


    }


    useEffect(() => {
      setisLoading(true)
      const GetAttendance =async()=>{
        try{
          const AttendanceDataResponse = await GetStudentAttendanceData({roll:roll, getAttendance:true})
          if(AttendanceDataResponse.status==200){
            setAttendanceData(AttendanceDataResponse.data)
            setNoData(false)
            ConfigureAttendanceData()
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
      const SubjectAddStatus = await GetStudentAttendanceData()
    }

    
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
            <h1 className="noSubjectHeader">No Subjects Found</h1>
            <button className="addSubjectButton">Add a Subject</button>
          </>
      ): null


    )
    
    }

  </div>)
}
