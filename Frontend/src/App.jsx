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
import StudentDashboardPage from './pages/StudentPages/Dashboard/dashboard.jsx'

import StudentChangePassword from './pages/StudentPages/Password Change/ChangePassword.jsx';
import StudentForgetPassword from './components/loginComponents/StudentLoginComponent/ForgetPassword/StudentForgetPasword.jsx';

import SuperAdminDashboard from './pages/AdminPages/SuperAdmin/Dashboard/Dashboard.jsx';

function App() {
  return (
    <Router>
        <Suspense fallback={<Loader />}>
        
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginAndSignUP />} />
          <Route path="/login/student/forget-password" element={<StudentForgetPassword />} />

          <Route path="/student-dashboard" element={<StudentDashboardPage />} />
          <Route path="/student-dashboard/change-password" element={<StudentChangePassword/>}/>

          <Route path="/super-admin/admin-dashboard" element={<SuperAdminDashboard/>}/>

        </Routes>

        </Suspense>
    </Router>
  )
}

export default App;
