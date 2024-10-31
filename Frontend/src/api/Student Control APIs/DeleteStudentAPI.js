import axios from "axios";

export default async function DeleteStudentByRole(roll) {
    const token = localStorage.getItem('aot-student-login-authorization-token');
    const config = { 
        headers: {
            'aot-student-login-authorization-token': token
        },
        data: { "roll": roll } // Pass data within the config for DELETE
    };

    try {
        const response = await axios.delete(
            'https://institute-site-az-bug-busters.onrender.com/api/delete/student', 
            config
        );
        
        if (response.status === 200) {
            return { "status": response.status };
        } else if (response.status === 403) {
            return { "status": 403 };
        } else {
            return { "status": 500 };
        }
        
    } catch (error) {
        return { "status": 500 };
    }
}
