/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./SendingNoticeModal.css";
import axios from "axios";

const socket = io("https://advanced-institute-management-portal.onrender.com"); // Adjust URL if backend runs elsewhere

export default function SendingNoticeModal(params) {
  const [percentageStatus, setPercentageStatus] = useState(0);
  const [successNumber, setSuccessNumber] = useState(0);
  const [failedNumbers, setFailedNumbers] = useState(0);
  const [totalNumbers, setTotalNumbers] = useState(params.data.emails.length);
  const [SendingNotices,setSendingNotices]= useState(false)
  const [SentNotices, setSentNotices]= useState(false)

  useEffect(() => {
    const SuccessPerVar= Math.round(((successNumber + failedNumbers)/totalNumbers)*100)
    setPercentageStatus(SuccessPerVar)
  }, [totalNumbers,successNumber,failedNumbers])
  

  useEffect(() => {
    // Listen for email progress updates
    socket.on("emailProgress", ({ progress }) => {
      setSuccessNumber((prev) => prev + 1);
    });

    socket.on("emailComplete", ({ message }) => {
      console.log(message);
      setPercentageStatus(100);
    });

    socket.on("emailError", ({ message }) => {
      console.error(message);
      setFailedNumbers((prev) => prev + 1);
    });

    return () => {
      socket.off("emailProgress");
      socket.off("emailComplete");
      socket.off("emailError");
    };
  }, []);


// Function to trigger the backend API call
const sendNotices = async () => {
  try {
    setSendingNotices(true)
    const token = await localStorage.getItem('aot-student-login-authorization-token');
    const response = await axios.put(
      "https://advanced-institute-management-portal.onrender.com/api/notice/multiple",
      {
        EmailList: params.data.emails,
        subject: params.data.Subject,
        ByName: params.data.Name,
        ByPosition: params.data.Designation,
        content: params.data.Content,
      },
      {
        headers: {
          'aot-student-login-authorization-token': token
        },
      }
    );

    console.log("Notices sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending notices:", error.response ? error.response.data : error.message);
  }finally{
    setSentNotices(true)
  }
};


  return (
    <div className="SendingNoticeModalBackground">
      <div className="SendingNoticeModalContainer" onClick={(e) => e.stopPropagation()}>
        <span className="SendingNoticeModalHeader">SENDING MAILS</span>
        <div className="SendingNoticeModalStatusBarBG">
          <div className="SendingNoticeModalStatusBar" style={{ width: `${percentageStatus}%` }}></div>
        </div>
        <span className="SendingNoticeModalStatus">{percentageStatus}%</span>
        <div className="SendingNoticeModalNumbersArea">
          <span className="SendingNoticeModalTotalNumber">Total: {totalNumbers}</span>
          <span className="SendingNoticeModalSuccessNumber">Success: {successNumber}</span>
          <span className="SendingNoticeModalFailedNumber">Failed: {failedNumbers}</span>
        </div>
        <button
          className="SendingNoticeModalCloseButton"
          style={SentNotices ? null : { backgroundColor: "red", boxShadow: "0 0 10px rgba(255, 0, 0, 0.8)" }}
          onClick={params.onClose}
        >
          {SentNotices?"Done": "Cancel"}
        </button>
        <button className="SendingNoticeModalStartButton" onClick={sendNotices} disabled={SendingNotices}>
            {SentNotices ? "Sent" : (SendingNotices ? "Sending.." : "Start Sending")}
        </button>
      </div>
    </div>
  );
}
