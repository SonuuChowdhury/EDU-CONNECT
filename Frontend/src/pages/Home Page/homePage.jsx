// CSS importings 
import './homePage.css'

// importing modules 
import { useState, useEffect, lazy, Suspense } from 'react';

// home apis 
import { FetchAllHomePageData } from '../../api/GetHomeData';

// importing components
const MasterPhotos = lazy(() => import('../../components/HomePage Components/MasterSection/MasterSectionPhotos'));
import NoticeSection from '../../components/HomePage Components/NoticeSection/notices';
import Loader from '../../components/loader/loader'; 
import EventSection from '../../components/HomePage Components/eventSection/eventSection';
import Achievements from '../../components/HomePage Components/achievements/achievements';

export default function HomePage() {                                                            

  // Getting the home page data 
  const [HomeData, SetHomeData] = useState({});
  const GetHomeData = async () => {
    const data = await FetchAllHomePageData();
    SetHomeData(data);
  };

  useEffect(() => {
    GetHomeData();
  }, []);

  return (
    <>
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




      </Suspense>
    </>
  );
}
