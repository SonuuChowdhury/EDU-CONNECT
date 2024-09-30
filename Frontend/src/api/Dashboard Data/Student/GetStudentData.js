import axios from 'axios';

export default async function GetStudentDashBoardData() {
    const token = await localStorage.getItem('aot-student-login-authorization-token');
    
    if (!token) {
        console.error('No token found in localStorage.');
        return {'status':403}; 
    }

    try {
        const { data } = await axios.get('https://institute-site-az-bug-busters.onrender.com/api/student-dashboard', {
            headers: {
                'aot-student-login-authorization-token':token
            }
        });
        return data;
    } catch (error) {
        console.error('Error fetching student dashboard data:', error);
        throw error; 
    }
}
