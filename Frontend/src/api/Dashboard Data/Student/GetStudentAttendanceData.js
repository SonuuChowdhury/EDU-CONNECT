import axios from 'axios';

export default async function GetStudentAttendanceData(roll) {
    const token = localStorage.getItem('aot-student-login-authorization-token');
    
    if (!token) {
        console.error('No token found in localStorage.');
        return { 'status': 403, 'message': 'Unauthorized: No token' }; 
    }

    try {
        const { data } = await axios.get('https://advanced-institute-management-portal.onrender.com/api/student-dashboard/attendance', {
            params: { // Use params to send data in GET request
                "roll": roll,
                "getAttendance": true
            },
            headers: {
                'aot-student-login-authorization-token': token
            }
        
        });
        console.log(data)
        return data;
    } catch (error) {
        console.log(error)
        // Handle network error or offline
        if (error.message === 'Network Error' || !window.navigator.onLine) {
            console.error('No internet connection detected.');
            return { 'status': 503, 'message': 'Service Unavailable: No Internet Connection' };
        }
        
        // Handle specific HTTP errors (optional)
        if (error.response) {
            if (error.response.status === 404) {
                console.error('Attendance data not found.');
                return { 'status': 404, 'message': 'Attendance data not found.' };
            }
            if (error.response.status === 500) {
                console.error('Server error.');
                return { 'status': 500, 'message': 'Server error.' };
            }
        }
        
        // Rethrow the error if it's not a handled case
        throw error; 
    }
}
