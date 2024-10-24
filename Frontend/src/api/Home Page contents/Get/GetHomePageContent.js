/* eslint-disable no-undef */
import axios from 'axios';
import sortArrayBySerial from '../../../utils/SortBySerial.js'

export default async function GetHomePageContent(contentChoice) {
    const token = await localStorage.getItem('aot-student-login-authorization-token');    
    const headerObj = { 
        headers: {
            'aot-student-login-authorization-token': token
        }
    };

    const ServerSite = "https://institute-site-az-bug-busters.onrender.com";

    let ResponseData;
    switch (contentChoice) {
        case 0:
            ResponseData = await axios.get(`${ServerSite}/api/super-admin/masterphotos`, headerObj);
            break;
        case 1:
            ResponseData = await axios.get(`${ServerSite}/api/super-admin/notices`, headerObj);
            break;
        case 2:
            ResponseData = await axios.get(`${ServerSite}/api/super-admin/events`, headerObj);
            break;
        case 3:
            ResponseData = await axios.get(`${ServerSite}/api/super-admin/acheivements`, headerObj);
            break;
        case 4:
            ResponseData = await axios.get(`${ServerSite}/api/super-admin/facilities`, headerObj);
            break;
        case 5:
            ResponseData = await axios.get(`${ServerSite}/api/super-admin/faculty-details`, headerObj);
            break;
        case 6:
            ResponseData = await axios.get(`${ServerSite}/api/super-admin/messages`, headerObj);
            break;
        case 7:
            ResponseData = await axios.get(`${ServerSite}/api/super-admin/faqs`, headerObj);
            break;
        case 8:
            ResponseData = await axios.get(`${ServerSite}/api/super-admin/footer-info`, headerObj);
            break;
        default:
            return { "status": 500 };
    }
    if(ResponseData.status==200){
        const sortedData = sortArrayBySerial(ResponseData.data)
        return {"status":200,
            "data":sortedData
        };
    }else{
        return {"status":500}
    }
}
