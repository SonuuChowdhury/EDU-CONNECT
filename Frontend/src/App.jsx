// Modules
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Styles
import './styles/App.css';

// importing loaders 
import Loader from './components/loader/loader';


// Lazy load the HomePage component
const HomePage = lazy(() => import('./pages/Home Page/homePage'));
import LoginAndSignUP from './pages/LoginAndSignUP/LoginAndSignUP';

function App() {
  return (
    <Router>
        <Suspense fallback={<Loader />}>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>

        <Routes>
          <Route path="/login" element={<LoginAndSignUP />} />
        </Routes>



        </Suspense>

    </Router>
  )
}

export default App;
