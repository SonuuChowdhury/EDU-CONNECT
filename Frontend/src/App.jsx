// Modules 
import React, { useState, useEffect } from 'react';


// Styles 
import './styles/App.css'

// Components 
import HeadNav from './components/HeadNav/headNav'
import { FetchAllHomePageData } from './api/GetHomeData'
import Navbar from './components/Navbar/navbar'
import MasterPhotos from './components/MasterSection/MasterSectionPhotos'


function App() {
    // Getting the home page data 
    const [HomeData, SetHomeData] = useState({});
    const GetHomeData = async () => {
        const data = await FetchAllHomePageData();
        SetHomeData(data);
    };
    useEffect(() => {
        GetHomeData();
    }, []);

    
    
    return <>
        <HeadNav></HeadNav>
        <Navbar></Navbar>
        <MasterPhotos params={HomeData.masterphotos}></MasterPhotos>
        
    </>

}


export default App
