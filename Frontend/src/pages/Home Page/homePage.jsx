// CSS importings 
import './homePage.css'

// importing modules 
import { useState, useEffect, lazy, Suspense } from 'react';

// home apis 
import { FetchAllHomePageData } from '../../api/GetHomeData';

// importing components
// Components
import HeadNav from '../../components/HomePage Components/HeadNav/headNav'
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

  // States to handle data and loading status
  const [HomeData, SetHomeData] = useState({});
  const [loading, setLoading] = useState(true);  // New state for loader

  // Getting the home page data 
  const GetHomeData = async () => {
    const data = await FetchAllHomePageData();
    SetHomeData(data);
    setLoading(false);  // Data loaded, stop showing the loader
  };

  useEffect(() => {
    GetHomeData();
  }, []);

  return (
    <>
      <HeadNav/>
      <Navbar/>
      {loading ? (
        <Loader />  // Show loader until data is fetched and components are loaded
      ) : (
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
      )}
    </>
  );
}
