/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './tryAgain.css';

function TryAgainTopBarPopup({ status, msg}) {
  const [show, setShow] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#ff4d4f");

  // Update the background color based on the status
  useEffect(() => {
    if ([4, 5, 9, 10, 11, 14, 16, 18, 21,23].includes(status)) {
      setBackgroundColor("#4caf50");
    } else {
      setBackgroundColor("#ff4d4f");
    }
  }, [status]);

  function GetPopUpMessage(status,msg) {
    switch (status) {
      case 500:
      case 3:
        return "Oops! An Error Occurred";
      case 404:
        return "No OTPs found or they expired.";
      case 400:
        return "Invalid Password";
      case 1:
        return "Password Mismatched!";
      case 2:
        return "Please Enter the New Password!";
      case 4:
        return "Password Changed Successfully!";
      case 5:
        return "OTP Verified Successfully! Redirecting...";
      case 6:
        return "Wrong OTP Entered!";
      case 7:
        return "OTP Expired.";
      case 8:
        return "Invalid Roll Number.";
      case 9:
        return "Profile Photo Changed! Finishing...";
      case 10:
        return "Profile Photo Removed! Finishing...";
      case 11:
        return "OTP Sent to the registered mail...";
      case 12:
        return "Invalid UID Number...";
      case 13:
        return "Enter the credentials";
      case 14:
        return "Item Deleted Successfully";
      case 15:
        return "Failed to Delete Item";
      case 16:
        return "Item Updated Successfully";
      case 17:
        return "Failed to Update Item";
      case 18:
        return "Item Added Successfully";
      case 19:
        return "Failed to Add Item";
      case 20:
        return "Attach the Image to Add the Item";
      case 21:
        return "Student Deleted Successfully!"
      case 22:
        return "Failed to Delete Student Or Student does not exists"
      case 23:
        return msg; // for green messages
      case 24:
        return msg; // for red messages
      case 25:
        return "Redirecting to Dashboard..."
      default:
        return "Something went wrong!";
    }
  }

  // Automatically hide the popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    // Cleanup the timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`top-bar-popup ${show ? 'show' : 'hide'}`} style={{ backgroundColor }}>
      {GetPopUpMessage(status,msg)}
    </div>
  );
}

export default TryAgainTopBarPopup;
