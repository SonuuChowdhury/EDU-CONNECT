/* eslint-disable react/prop-types */
import './notices.css'
import { useState,useEffect } from 'react'
import { formatDate } from '../../../utils/fomatDate.js'; // Import the date formatting function

import Aos from 'aos';
import 'aos/dist/aos.css';

function NoticeSection({ params = [] }) {

    useEffect(() => {
        Aos.init({
            duration: 600,
            easing: 'ease-in-out',
            once: false,
            mirror: false,
            offset: 5,
        });
    }, []);

    useEffect(() => {
        Aos.refresh();
    }, [params]);


    const [selectedNotice, setSelectedNotice] = useState(null)

    const handleNoticeClick = (data) => {
        setSelectedNotice(data)
    }

    const closePopUP = () => {
        setSelectedNotice(null)
    }

    return <>
        {params.map((data) => (
            <div
                data-aos='fade-up'
                className="NoticeContainer" 
                key={data.serial} 
                onClick={() => handleNoticeClick(data)}
            >
                <img src="/notice.png" className='noticePNG' alt="Notice Icon" />
                <p className='NoticeTitleArea'>{data.tittle}</p>
            </div>
        ))}
        {selectedNotice && 
            <>
                <div className="overlay" onClick={closePopUP}></div>
                <NoticePopUP parampop={selectedNotice} onClose={closePopUP} />
            </>
        }
    </>
}

function NoticePopUP({ parampop, onClose }) {
    const handleExploreClick = () => {
        window.open(parampop.link, '_blank')
    }

    return <>
        <div className="NoticePopUPContainer">
            <button className="closeButton" onClick={onClose}>X</button>
            <h2 className='noticeHeadingPopUp'>Notice</h2>
            <h1 className='NoticePopUPTitle'>{parampop.tittle}</h1>
            <h3>{formatDate(parampop.date)}</h3>
            <p className='NoticePopUPDescription'>{parampop.description}</p>
            <button className="explore-button" onClick={handleExploreClick}>
                Know More
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 19" className="explore-icon">
                    <path className="explore-icon-path" d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"></path>
                </svg>
            </button>
        </div>
    </>
}

export default NoticeSection
