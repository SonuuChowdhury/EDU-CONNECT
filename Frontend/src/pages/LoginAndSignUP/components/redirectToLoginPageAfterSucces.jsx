import { useEffect, useState } from 'react';
import './redirectToLoginPageAfterSucces.css';
import { useNavigate } from 'react-router-dom';

export default function RedirectToLoginPageAfterSucces() {
    const navigate=useNavigate()
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCounter((prevCounter) => {
                if (prevCounter > 1) {
                    return prevCounter - 1;
                } else {
                    clearInterval(timer);
                    // Redirect to login page
                    navigate('/student-dashboard')
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <>
            <div className="redirectToLoginPageAfterSuccesBackground">
                <div className="redirectToLoginPageAfterSuccesBox">
                    <div className="tickAnimation">
                        <span className="tick">✔</span>
                    </div>
                    <p className="successMessage">
                        Account created successfully! 
                    </p>
                    <p>Please check your email for your roll number and password to log in.</p>
                    <p className="redirectMessage">
                        Redirecting to the Student Dashboard in {counter} seconds...
                    </p>
                </div>
            </div>
        </>
    );
}