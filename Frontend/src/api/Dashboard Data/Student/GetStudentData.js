import axios from 'axios'


export default async function GetStudentDashBoardData(){
    const token=localStorage.getItem('AOT_LOGIN_AUTH_TOKEN');
    const {data} = await axios.get('https://institute-site-az-bug-busters.onrender.com/api/student-dashboard',
        {
            headers:{AOT_LOGIN_AUTH_TOKEN:token}
    });

    return data;
}