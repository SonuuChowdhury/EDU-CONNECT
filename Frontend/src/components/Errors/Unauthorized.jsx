import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Unauthorized.css';

export default function Unauthorized() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="unauthorized-container">
            <img src="/Unauthorized.svg" alt="Unauthorized" className="unauthorized-image" />
            <h1 className="unauthorized-text">Unauthorized Access</h1>
            <p className="unauthorized-redirect">Redirecting to login page soon...</p>
        </div>
    );
}
