/* eslint-disable react/prop-types */
import './eventSection.css';
import { useState, useEffect } from 'react';
import { formatDate } from '../../../utils/fomatDate.js'; // Import the date formatting function
import Aos from 'aos';
import 'aos/dist/aos.css';

function EventSection({ params = [] }) {
    useEffect(() => {
        Aos.init({
            duration: 600,
            easing: 'ease-in-out',
            once: false,
            mirror: true,
        });
    }, []);

    useEffect(() => {
        Aos.refresh();
    }, [params]);

    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleEventClick = (data) => {
        setSelectedEvent(data);
    };

    const closePopUP = () => {
        setSelectedEvent(null);
    };

    const handleExploreClick = (link) => {
        window.open(link, '_blank');
    };

    return (
        <>
            {params.map((data) => (
                <div
                    className="EventContainers"
                    key={data.serial}
                    style={{ backgroundImage: `url(${data.photo})` }}
                    data-aos="fade-up"
                    onClick={() => handleEventClick(data)}
                >
                    <h2 className="EventContainerstitle">{data.title}</h2>
                </div>
            ))}
            {selectedEvent && (
                <>
                    <div className="overlay" onClick={closePopUP}></div>
                    <EventPopUP
                        parampop={selectedEvent}
                        onClose={closePopUP}
                        onExplore={handleExploreClick}
                    />
                </>
            )}
        </>
    );
}

function EventPopUP({ parampop, onClose, onExplore }) {
    return (
        <>
            <div className="EventPopUPContainer">
                <button className="closeButton" onClick={onClose}>
                    X
                </button>
                <h2 className='noticeHeadingPopUp'>Upcoming Event</h2>
                <h1 className="EventPopUPTitle">{parampop.title}</h1>
                <h3>on {formatDate(parampop.date)}</h3> {/* Add "on" before the formatted date */}
                <p className="EventPopUPDescription">{parampop.description}</p>
                <button
                    className="explore-button"
                    onClick={() => onExplore(parampop.link)}
                >
                    Know More
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 19"
                        className="explore-icon"
                    >
                        <path
                            className="explore-icon-path"
                            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                        ></path>
                    </svg>
                </button>
            </div>
        </>
    );
}

export default EventSection;
