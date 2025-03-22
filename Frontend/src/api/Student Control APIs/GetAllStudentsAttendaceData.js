import axios from "axios";

export default async function GetAllStudentsAttendaceData() {
    const token = localStorage.getItem('aot-student-login-authorization-token');
    const config = { 
        headers: {
            'aot-student-login-authorization-token': token
        }
    };

    try {
        const response = await axios.post(
            'https://advanced-institute-management-portal.onrender.com/api/super-admin/students-attendance', 
            {},  // Empty object as the request body if none is needed
            config
        );
        if (response.status) {
            return response;
        } 
    } catch (error) {
        console.error(error);
        return { "status": 500 };
    }
}
