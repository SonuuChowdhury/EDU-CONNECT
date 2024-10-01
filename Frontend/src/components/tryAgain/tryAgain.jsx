/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './tryAgain.css';

function GetPopUpMessage(status) {
  switch (status) {
    case 500:
      return "Oops! An Error Occurred";
    case 404:
      return "Invalid Roll/UID Number!";
    case 400:
      return "Invalid Password!";
    default:
      return "Something went wrong!";
  }
}

function TryAgainTopBarPopup({ status }) {
  const [show, setShow] = useState(true);

  // Automatically hide the popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // Hide after 3 seconds

    // Cleanup the timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
      <div className={`top-bar-popup ${show ? 'show' : 'hide'}`}>
        {GetPopUpMessage(status)}
    </div>
  );
}

export default TryAgainTopBarPopup;
