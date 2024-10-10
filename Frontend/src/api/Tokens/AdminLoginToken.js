import axios from "axios";

export default async function GetAdminData(uid, password,otp,reqType) {
    const adminPostData = {
        "uid": uid,
        "password": password,
        "otp":otp,
        "reqType":reqType
    };

    try {
        // Use await to wait for the Axios post request to complete
        const response = await axios.post('https://institute-site-az-bug-busters.onrender.com/login/admin', adminPostData);
        
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
