/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
import BasicNavbar from '../../components/basicNavbar/basicNavbar';

function NotFound() {
    const navigate = useNavigate();

    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <>
            <BasicNavbar />
            <div className="notFoundContainer">
                <h1 className="notFoundTitle">404</h1>
                <p className="notFoundMessage">Oops! The page you're looking for doesn't exist.</p>
                <button className="goHomeButton" onClick={navigateToHome}>
                    Go to Home
                </button>
            </div>
        </>
    );
}

export default NotFound;
