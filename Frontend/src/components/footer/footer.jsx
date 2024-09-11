import { useState } from 'react';

import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import solid icons
import { faYoutube, faLinkedin, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'; // Import brand icons

// Function to open links in a new tab
const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
};

// eslint-disable-next-line react/prop-types, no-unused-vars
function Footer({ params = [] }) {
    // eslint-disable-next-line no-unused-vars
    const [data, setData] = useState(params[0]);
    console.log(data);

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

                        <div className="QuickLinksSection"></div>
                        <div className="ImpLinksSections"></div>
                        <div className="FeedbackSections"></div>
                    </div>
                    <div className="VisitorCountSection"></div>
                </div>

                <div className="FooterAreaBottom">
                    <span className="FooterAreaBottomCopyrightText">© 2024 Academy Of Technology- ALL RIGHTS RESERVED</span>
                    <span className="FooterAreaBottomDevelopedBySection">
                        Developed By |
                        <a
                            className='FooterPortfolioLink'
                            onClick={() => openLink(data.developerLink)}
                        > Sonu Chowdhury</a>
                    </span>
                </div>
            </footer>
        </>
    );
}

export default Footer;
