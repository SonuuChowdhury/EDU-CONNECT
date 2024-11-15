import axios from 'axios';

export default async function GetStudentDashBoardData() {
    const token = await localStorage.getItem('aot-student-login-authorization-token');
    
    if (!token) {
        console.error('No token found in localStorage.');
        return { 'status': 403 }; 
    }

    try {
        const { data } = await axios.get('https://institute-site-az-bug-busters-33ps.onrender.com/api/student-dashboard', {
            headers: {
                'aot-student-login-authorization-token': token
            }
        });
        return data;
    } catch (error) {
        // Check if the error is related to network issues (offline mode)
        if (error.message === 'Network Error' || !window.navigator.onLine) {
            console.error('No internet connection detected.');
            return { 'status': 503, 'message': 'Service Unavailable: No Internet Connection' };
        }
        throw error; 
    }
}
