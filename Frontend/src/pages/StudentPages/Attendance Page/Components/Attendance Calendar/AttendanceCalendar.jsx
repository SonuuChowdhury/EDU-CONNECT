/* eslint-disable no-unused-vars */
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styling
import "./AttendanceCalendar.css";
import { useState, useEffect} from "react";

const AttendanceCalendar = (params) => {
  // Format dates to YYYY-MM-DD
  const greenDates = params.data.PresentDates.map((d) =>
    d.split("T")[0]
  ); // Green marked dates
  const redDates = params.data.AbsentDates.map((d) =>
    d.split("T")[0]
  ); // Red marked dates


  const [dataAvailable, SetDataAvailable] = useState(true);

  useEffect(() => {
    if(greenDates.length==0 && redDates.length==0){
        SetDataAvailable(false)
    }
    
  }, [redDates,greenDates])
  

  const formatDateToLocal = (date) => {
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // Adjust for local timezone
    return offsetDate.toISOString().split("T")[0];
  };
  
  const isGreenDate = (date) => {
    const formattedDate = formatDateToLocal(date); // Use local time zone
    return greenDates.includes(formattedDate);
  };
  
  const isRedDate = (date) => {
    const formattedDate = formatDateToLocal(date); // Use local time zone
    return redDates.includes(formattedDate);
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
                if (isGreenDate(date)) {
                  return "highlight-green"
                }
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
