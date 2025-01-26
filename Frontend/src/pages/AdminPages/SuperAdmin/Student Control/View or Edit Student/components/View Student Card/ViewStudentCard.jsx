/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import './ViewStudentCard.css';

export default function ViewStudentCard({ isOpen, onClose, data }) {
    const [isClosing, setIsClosing] = useState(false);

    // Handle closing animation
    const handleClose = () => {
        setIsClosing(true);
        setIsClosing(false);
        onClose();
    };

    // Return null if not open
    if (!isOpen && !isClosing) return null;

    return (
        <div className="viewStudentCardOverlay" onClick={handleClose}>
            <div
                className={`viewStudentCardContent ${isClosing ? 'zoomOut' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="viewStudentCardImage"
                    style={data.isProfile? {backgroundImage:`url(${data.profile})`} : {backgroundImage:`url('/defaultProfile.jpg')`}}
                />
                <h1>{data.name}</h1>
                <span className="viewStudentCardRoll">{data.roll}</span>
                <span className="viewStudentCardDepartment">{data.department}</span>
                <div className="viewStudentCardYearAndSem">
                    Year: {data.year}   |   Semester: {data.semester}
                </div>
                <div className="viewStudentCardContactdetailsHeader">Contact Details</div>
                <span className="viewStudentCardEmail">{data.email}</span>
                <span className="viewStudentCardMobile">{data.mobile}</span>
                <span className="viewStudentCardAddress">{data.address}</span>
            </div>
        </div>
    );
}
