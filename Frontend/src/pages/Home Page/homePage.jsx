// CSS importings 
import './homePage.css'

// importing modules 
import { useState, useEffect, lazy, Suspense } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

// home apis 
import { FetchAllHomePageData } from '../../api/GetHomeData';

// importing components
// Components
import HeadNav from '../../components/HomePage Components/HeadNav/headNav'
import BasicNavbar from '../../components/basicNavbar/basicNavbar'
import Navbar from '../../components/Navbar/navbar';
const MasterPhotos = lazy(() => import('../../components/HomePage Components/MasterSection/MasterSectionPhotos'));
import NoticeSection from '../../components/HomePage Components/NoticeSection/notices';
import EventSection from '../../components/HomePage Components/eventSection/eventSection';
import Achievements from '../../components/HomePage Components/achievements/achievements';
import FacilitiesSection from '../../components/HomePage Components/facilitiesSection/facilities';
import DetailsSection from '../../components/HomePage Components/details/details';
import Faqs from '../../components/HomePage Components/faqs/faqs';

// importing loaders 
import Loader from '../../components/loader/loader'; 
import Footer from '../../components/footer/footer';

export default function HomePage() {            
  const [ShowWelcomeMessage, SetShowWelcomeMessage]= useState(true)                                                

  // States to handle data and loading status
  const [HomeData, SetHomeData] = useState(null);
  const [loading, setLoading] = useState(true);  // New state for loader

  const [IsError,SetIsError]= useState(true)

  // Getting the home page data 
  const GetHomeData = async () => {
    try{
      const HomeData = await FetchAllHomePageData();
      if(HomeData.status==200){
        SetHomeData(HomeData.data)
        SetIsError(false)
      }else{
        SetIsError(true)
      }
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    GetHomeData();
  }, []);

  return (
    <>

{ShowWelcomeMessage ? (
  <>
    <div className="ShowWelcomeMessageBackgroundArea" onClick={()=>{SetShowWelcomeMessage(false)}}>
      <div className="ShowWelcomeMessageBackgroundBox">
        <span
          className="CloseWelcomeMessageButton"
          onClick={() => SetShowWelcomeMessage(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </span>
        <div className="WelcomeMessageContent" onClick={(e)=>e.stopPropagation()}>
          <h1 className='WelcomeMessageContentHeader'>Welcome to the ADVANCED INSTITUTE MANAGEMENT PORTAL 🌟</h1>
          <p className='WelcomeMessageContentParas'>
            This platform is a <strong>developer project</strong> showcasing
            the potential design and functionality for an institutional website. 
            Please note that this is <strong>not the official website </strong> 
            of the Academy of Technology but a demonstration of modern web 
            development capabilities.
          </p>
          <p className='WelcomeMessageContentParas'>
            <strong>Designed and Developed with Passion 💻</strong><br />
            I’m <strong>Sonu Chowdhury</strong>, the developer behind this project. 
            It’s been an exciting journey to create this platform to highlight how 
            technology can enhance institutional experiences.
          </p>
          <p className='WelcomeMessageContentParas'>
            Feel free to explore the features, and if you’re interested in my work 
            or wish to collaborate, visit my portfolio: <br />
            <a
              href="https://portfolio-sonuuchowdhury.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="PortfolioLink"
            >
              👉 Sonu Chowdhury - Portfolio
            </a>
          </p>
          <p className='WelcomeMessageContentParas'>Thank you for visiting, and I hope you enjoy browsing through this development project! 😊</p>
        </div>
      </div>
    </div>
  </>
) : null}


      {loading ? (
        <Loader />  // Show loader until data is fetched and components are loaded
      ) : null}

      {IsError? (
        <>
          <BasicNavbar/>
          <div className="HomePageErrorArea">
      <div className="ErrorBoard">
        <h1 className="ErrorTitle">Server Down</h1>
        <p className="ErrorMessage">
          Oops! Something went wrong. Please try again later.
        </p>
        <ul className="ErrorSuggestions">
          <li>Check your internet connection.</li>
          <li>Try refreshing the page.</li>
          <li>Contact support if the issue persists.</li>
        </ul>
        <button
          className="RetryButton"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
        </>
      ):(<>
        <HeadNav/>
        <Navbar/>
        <Suspense fallback={<Loader />}>
          {HomeData.masterphotos ? (
            <MasterPhotos params={HomeData.masterphotos}></MasterPhotos>
          ) : (
            <Loader />
          )}

          <div className='noticeAndEventSection'>
            <div className="noticeSection">
              <h2 className='noticeHeading'>Important Notices</h2>
              <div className='noticeSectionContent'>
                <NoticeSection params={HomeData.notices}></NoticeSection>
              </div>
            </div>
            <div className="eventSection">
              <h2 className='eventHeading'>Upcoming Events</h2>
              <div className="eventSectionContent">
                <EventSection params={HomeData.events}></EventSection>
              </div>
            </div>
          </div>

          <div className="achievementSection">
            <h1 className='achievementSectionHeading'>Achievements @2024</h1>
            <div className="achievementSectionArea">
              <Achievements params={HomeData.achievements}></Achievements>
            </div>
          </div>

          <div className="facilitiesSection">
            <h1 className='facilitiesSectionHeader'>Facilities @AOT</h1>
            <div className="facilitiesSectionContentArea">
              <FacilitiesSection params={HomeData.facilities}></FacilitiesSection>
            </div>
          </div>

          <div className="detailsSection">
            <DetailsSection params={HomeData.details}></DetailsSection>
          </div>

          <div className="faqsSection">
            <h1>FAQs</h1>
            <Faqs params={HomeData.faqs}></Faqs>
          </div>

          <Footer params={HomeData.footerinfos}></Footer>
        </Suspense>
        </>

      )}
        
    </>
  );
}
