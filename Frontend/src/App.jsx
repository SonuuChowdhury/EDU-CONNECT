// Modules
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Styles
import './styles/App.css';

// Components
import HeadNav from './components/HeadNav/headNav';
import Navbar from './components/Navbar/navbar';
import Loader from './components/loader/loader';

// Lazy load the HomePage component
const HomePage = lazy(() => import('./pages/homePage'));

function App() {
  return (
    <Router>
        <Suspense fallback={<Loader />}>
        
        <HeadNav />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>

        </Suspense>
        
    </Router>
  )
}

export default App;
