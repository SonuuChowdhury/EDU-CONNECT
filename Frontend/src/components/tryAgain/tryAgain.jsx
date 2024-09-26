import './tryAgain.css'
// TopBarPopup.js
import  { useState, useEffect } from 'react';

function TryAgainTopBarPopup() {
  const [show, setShow] = useState(true);

  // Automatically hide the popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // Hide after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`top-bar-popup ${show ? 'show' : 'hide'}`}>
      Oops, PLEASE TRY AGAIN
    </div>
  );
}

export default TryAgainTopBarPopup;
