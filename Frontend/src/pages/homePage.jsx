// importing modules 
import { useState,useEffect } from 'react';

// importing components
import MasterPhotos from '../components/MasterSection/MasterSectionPhotos'
import { FetchAllHomePageData } from '../api/GetHomeData'

export default function HomePage(){
    // Getting the home page data 
    const [HomeData, SetHomeData] = useState({});
    const GetHomeData = async () => {
    const data = await FetchAllHomePageData();
    SetHomeData(data);
    };

    useEffect(() => {
    GetHomeData();
    }, []);

    return(<>
        <MasterPhotos params={HomeData.masterphotos}></MasterPhotos>
        
    </>
    )
}

