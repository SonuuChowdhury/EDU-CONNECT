/* eslint-disable no-unused-vars */
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styling
import "./AttendanceCalendar.css";
import { useState, useEffect} from "react";

const AttendanceCalendar = (params) => {
  const greenDates = params.data.PresentDates; // Green marked dates
  const redDates = params.data.AbsentDates; // Red marked dates

  const [dataAvailable, SetDataAvailable] = useState(true);

  useEffect(() => {
    if(greenDates.length==0 && redDates.length==0){
        SetDataAvailable(false)
    }
    console.log(greenDates,redDates)
    
  }, [redDates,greenDates])
  

  const isGreenDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
    return greenDates.some((d) => d.split("T")[0] === formattedDate); // Match YYYY-MM-DD
  };
  
  const isRedDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return redDates.some((d) => d.split("T")[0] === formattedDate); // Match YYYY-MM-DD
  };
  

  return (
    <div className="AttendanceCalendarArea" onClick={params.onClose}>
      <div className="AttendanceCalendarAreaCard" onClick={(e)=>e.stopPropagation()}>
        <span className="AttendanceCalendarAreaCardHeader">
          ATTENDANCE CALENDAR
        </span>
        {dataAvailable ? (<>
          <Calendar
            className="CalendarBox"
            tileClassName={({ date, view }) => {
              if (view === "month") {
                if (isGreenDate(date)) return "highlight-green";
                if (isRedDate(date)) return "highlight-red";
              }
              return null;
            }}
            onChange={null}
          />
          <div className="AttendanceCalendarAreaCardDetailsArea">
            <span className="AttendanceCalendarAreaCardDetailsAreaColorPresent"></span>
            <span className="AttendanceCalendarAreaCardDetailsAreaColorDetails">
                Present
            </span>
            <span className="AttendanceCalendarAreaCardDetailsAreaColorAbsent"></span>
            <span className="AttendanceCalendarAreaCardDetailsAreaColorDetails">
                Absent
            </span>
          </div></>
        ) : (
          <span className="AttendanceCalendarAreaCardNoDataHeader">
            No Data Available
          </span>
        )}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
