/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';

import './footer.css';

import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faYoutube, faLinkedin, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';

// Function to open links in a new tab
const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
};

// eslint-disable-next-line react/prop-types, no-unused-vars
function Footer({ params = [] }) {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState(params[0]);
    const [currentCount, setCurrentCount] = useState(0);
    const [isCounting, setIsCounting] = useState(false); // State to track if counting has started
    const countRef = useRef(null); // Reference to the visitor count div

    // Start counting when footer is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !isCounting) {
                    setIsCounting(true); // Start counting when in view
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the footer is in view
        );
        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => {
            if (countRef.current) {
                observer.unobserve(countRef.current);
            }
        };
    }, [isCounting]);

    useEffect(() => {
        if (isCounting) {
            // Visitor Count Animation Logic
            const targetCount = data.visitorCount;
            const duration = 2000; // Total duration of animation
            const increment = Math.ceil(targetCount / (duration / 100));

            const updateCount = () => {
                setCurrentCount((prevCount) => {
                    if (prevCount + increment >= targetCount) {
                        return targetCount; // Stop when reaching the target
                    }
                    return prevCount + increment;
                });
            };

            const counter = setInterval(updateCount, 100);

            return () => clearInterval(counter); // Clean up the interval on component unmount
        }
    }, [isCounting, data.visitorCount]);

    return (
        <>
            <footer className="FooterArea">
                <div className='FooterAreaTop'>
                    <div className="InfoLinksANDFeedbackSection">
                        <div className="FooterInfoSection">
                            <h2 className="FooterInfoSectionHeading">Academy of Technology</h2>
                            <div className='FooterInfoSectionAddres' onClick={() => openLink(data.addressLink)}>
                                <FontAwesomeIcon icon={faLocationDot} className='FooterInfoSectionAddresIcon' />
                                <span className="FooterInfoSectionAddresText">
                                    Grand Trunk Rd, Adisaptagram, Krishnapur Chandanpur, Dakshin Hazipur, West Bengal 712502
                                </span>
                            </div>
                            <div className="FooterInfoSectionCall">
                                <FontAwesomeIcon icon={faPhone} className='FooterInfoSectionCallIcon' />
                                <span>{data.contactMobile}</span>
                            </div>
                            <div className="FooterInfoSectionMail">
                                <FontAwesomeIcon icon={faEnvelope} className='FooterInfoSectionMailIcon' />
                                <span>{data.contactMail}</span>
                            </div>
                            <div className="FooterSocials">
                                <h3 className='FooterSocialsHeading'>Connect With Us</h3>
                                <div className="FooterSocialsLinks">
                                    <FontAwesomeIcon
                                        className='FooterSocialsIcons'
                                        icon={faXTwitter}
                                        onClick={() => openLink(data.Xlink)}
                                    />
                                    <FontAwesomeIcon
                                        className='FooterSocialsIcons'
                                        icon={faInstagram}
                                        onClick={() => openLink(data.instagramLink)}
                                    />
                                    <FontAwesomeIcon
                                        className='FooterSocialsIcons'
                                        icon={faLinkedin}
                                        onClick={() => openLink(data.linkedinLink)}
                                    />
                                    <FontAwesomeIcon
                                        className='FooterSocialsIcons'
                                        icon={faYoutube}
                                        onClick={() => openLink(data.ytLink)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="QuickLinksSection">
                            <h3 className='QuickLinksSectionHeading'>Quick Links</h3>
                            <div className="QuickLinksSectionLinksSection">
                                <span className="QuickLinksSectionLinks">Login</span>
                                <span className="QuickLinksSectionLinks">About</span>
                                <span className="QuickLinksSectionLinks">Academics</span>
                                <span className="QuickLinksSectionLinks">Resources</span>
                                <span className="QuickLinksSectionLinks">Research</span>
                                <span className="QuickLinksSectionLinks">Contact us</span>
                            </div>
                        </div>

                        <div className="ImpLinksSections">
                        <h3 className='ImpLinksSectionsHeading'>Important Links</h3>
                            <div className="ImpLinksSectionsSection">
                                <span className="ImpLinksSectionsLinks">Attendance</span>
                                <span className="ImpLinksSectionsLinks">Library</span>
                                <span className="ImpLinksSectionsLinks">Ebooks</span>
                                <span className="ImpLinksSectionsLinks">PYQs</span>
                                <span className="ImpLinksSectionsLinks">Hostel</span>
                                <span className="ImpLinksSectionsLinks">Canteen</span>
                            </div>
                        </div>
                        <div className="FeedbackSections">
                            <h3>Your FeedBack</h3>
                            <input type="email" className='feedbakcEmailBox' placeholder='Your e-mail ID'/>
                            <input type="text" className='feedbackMessageBox' placeholder='Enter you feedback'/>
                            <button className='SubmitFeedback'>Submit</button>
                        </div>
                    </div>
                    <div className="VisitorCountSection" ref={countRef}>
                <h3>Visitors Count</h3>
                <div className="VisitorCountContainer">
                    {currentCount
                        .toString()
                        .padStart(6, '0') // Ensure there are always 6 digits
                        .split('')
                        .map((digit, index) => (
                            <span key={index} className="VisitorCountDigit">
                                {digit}
                            </span>
                        ))}
                </div>
            </div>

                    </div>

                <div className="FooterAreaBottom">
                    <span className="FooterAreaBottomCopyrightText">© 2024 Academy Of Technology- ALL RIGHTS RESERVED</span>
                    <span className="FooterAreaBottomDevelopedBySection">
                        Developed By |
                        <a
                            className='FooterPortfolioLink'
                            onClick={() => openLink(data.developerLink)}
                        > Sonu Chowdhury {(<FontAwesomeIcon icon={faArrowUpRightFromSquare} />)}</a>

                    </span>
                </div>
            </footer>
        </>
    );
}

export default Footer;
