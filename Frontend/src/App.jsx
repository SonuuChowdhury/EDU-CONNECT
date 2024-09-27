// Modules
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StudentDashboardProvider } from './context/StudentDashboardContext';

// Styles
import './styles/App.css';

// importing loaders 
import Loader from './components/loader/loader';


// Lazy load the HomePage component
const HomePage = lazy(() => import('./pages/Home Page/homePage'));
import LoginAndSignUP from './pages/LoginAndSignUP/LoginAndSignUP';
import StudentDashboardPage from './pages/StudentPages/Dashboard/dashboard.jsx'

function App() {
  return (
    <Router>
      <StudentDashboardProvider>
        <Suspense fallback={<Loader />}>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>

        <Routes>
          <Route path="/login" element={<LoginAndSignUP />} />
        </Routes>

        <Routes>
          <Route path="/student-dashboard" element={<StudentDashboardPage />} />
        </Routes>



        </Suspense>
        </StudentDashboardProvider>
    </Router>
  )
}

export default App;
