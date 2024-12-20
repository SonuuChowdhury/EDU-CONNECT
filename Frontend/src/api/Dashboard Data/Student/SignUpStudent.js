import axios from "axios";

export default async function StudentSignUP(params) {
    const otpNumber = Number(params.otp);
    const rollNumber = Number(params.roll);
    const MobileNumber = Number(params.mobile);
    const yearNumber = Number(params.year);
    const semNumber = Number(params.semester);
    
    const data = {
        "verifyEmail": params.verifyEmail,
        "verifyOTP": params.verifyOTP,
        "otp": otpNumber,
        "roll": rollNumber,
        "name": params.name,
        "department": params.department,
        "semester": semNumber,
        "year": yearNumber,
        "email": params.email,
        "mobile": MobileNumber,
        "address": params.address
    };

    try {
        const response = await axios.put(
            'https://advanced-institute-management-portal.onrender.com/signup/student', 
            data
        );

        return response;
    } catch (error) {
        if (error.response) {
            // Return the actual response from the server if available
            return error.response;
        } else {
            console.error("Network or server error:", error);
            return { status: 500, data: { msg: "An unexpected error occurred" } };
        }
    }
}
