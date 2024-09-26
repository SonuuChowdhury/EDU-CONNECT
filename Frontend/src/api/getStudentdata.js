import axios from "axios";

export default async function GetStudentData(rollNumber, pass) {
    const studentPostData = {
        "roll": rollNumber,
        "password": pass
    };

    try {
        // Use await to wait for the Axios post request to complete
        const response = await axios.post('https://institute-site-az-bug-busters.onrender.com/login/student', studentPostData);
        
        return {
            status: response.status,
            data: response.data
        };
    } catch (error) {
        return {
            status: error.response ? error.response.status : 500,
            data: error.response ? error.response.data : "An error occurred"
        };
    }
}
