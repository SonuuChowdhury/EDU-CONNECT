import axios from 'axios'

export default async function  StudentPasswordChangeAPI(NewPassword){
    const token = await localStorage.getItem('aot-student-login-authorization-token');
    console.log(NewPassword)
    
    if (!token) {
        console.error('No token found in localStorage.');
        return {'status':403}; 
    }
    try{
        const {response} = await axios.put('https://institute-site-az-bug-busters.onrender.com/api/student/change-password',
            {'NewPassword': NewPassword },
            {
                headers: {
                    'aot-student-login-authorization-token': token,
                },
            });
        return response
    }catch(error){
        return {'status':400}
    }
}