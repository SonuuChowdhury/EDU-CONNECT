// Modules 
import React, { useState, useEffect,Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Styles 
import './styles/App.css'

// Components 
import HeadNav from './components/HeadNav/headNav'
import Navbar from './components/Navbar/navbar'
import HomePage from './pages/homePage';


function App() {
    
    return <>
        <HeadNav></HeadNav>
        <Navbar></Navbar>
        <HomePage></HomePage>
        
        
    </>

}


export default App
