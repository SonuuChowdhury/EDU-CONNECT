// importing modules 
import { useState, useEffect, lazy, Suspense } from 'react';

// importing components
const MasterPhotos = lazy(() => import('../components/MasterSection/MasterSectionPhotos'));
import { FetchAllHomePageData } from '../api/GetHomeData';
import Loader from '../components/loader/loader'; // Import the Loader component

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
          <Loader /> // Show loader while fetching the home page data
        )}
      </Suspense>
    </>
  );
}
