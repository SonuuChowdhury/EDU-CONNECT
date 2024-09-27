/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// StudentDashboardContext.js
import { createContext, useContext, useState } from 'react';

// Create the context
const StudentDashboardContext = createContext();

// Create a provider component
export function StudentDashboardProvider({ children }) {
  const [dashboardData, setDashboardData] = useState({});
  const [openDash, setOpenDash] = useState(false);

  return (
    <StudentDashboardContext.Provider value={{ dashboardData, setDashboardData, openDash, setOpenDash }}>
      {children}
    </StudentDashboardContext.Provider>
  );
}

// Custom hook to use the Dashboard Context
export function useDashboardContext() {
  return useContext(StudentDashboardContext);
}
