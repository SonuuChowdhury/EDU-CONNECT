/* eslint-disable no-undef */
import axios from 'axios';

export default async function RephraseByGemeniAPI(text) {
    try {
        const token = await localStorage.getItem('aot-student-login-authorization-token');    
        const headerObj = { 
            headers: {
                'aot-student-login-authorization-token': token
            }
        };

        const responseData = await axios.post(
            'https://educore-institue-manager.onrender.com/api/rephrase',
            { text: text }, // Ensure correct payload format
            headerObj
        );

        if (responseData.status === 200) {
            return {
                status: 200,
                text: responseData.data.text
            };
        } else {
            return { status: 500 };
        }
    } catch (error) {
        console.error('Error in API request:', error);
        return { status: 500 };
    }
}
