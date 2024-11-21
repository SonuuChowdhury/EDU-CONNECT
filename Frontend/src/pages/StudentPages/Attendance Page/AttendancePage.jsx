/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./AttendancePage.css";

import Loader from "../../../components/loader/loader";

import GetStudentAttendanceDetails from "../../../../../Backend/src/api/StudentData/Attendance Details/Get Attendance Data/GetAttendaceData";

export default function AttendacePage({onClose}) {

    // const [isLoading, setisLoading] = useState(true);
    const [AttendanceData, setAttendanceData]= useState()
    const [NoData, setNoData] = useState(true)

    
  return (<div className="AttendaceContentArea">
    {/* {isLoading? <Loader /> : null} */}
    <div
      className="DashboardRedirectionButton"
      onClick={onClose}>
      ← Back
    </div>
    <h2 className="AttendanceMonitorHeader">ATTENDANCE MONITORING</h2>

    {NoData ? (
        <div className="NoAttendanceDataWrapper">
          <h1 className="NoAttendanceDataHeader">No Data Found</h1>
          <button className="StartMonitoringButton" >
            Start Monitoring Attendance
          </button>
        </div>
    ) : null}

  </div>)
}
