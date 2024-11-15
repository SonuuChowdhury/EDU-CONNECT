import axios from "axios";

export default async function GetAllStudentsData(){
    const token = await localStorage.getItem('aot-student-login-authorization-token');    
    const headerObj = { 
        headers: {
            'aot-student-login-authorization-token': token
        }
    };

    try{
        const ResponseData =await axios.get('https://institute-site-az-bug-busters-33ps.onrender.com/api/super-admin/students', headerObj)
        if(ResponseData.status==200){
            return {"data":ResponseData.data,
                "status":ResponseData.status
            }
        }else if(ResponseData.status==403){
            return {"status":403}
        }else{
            return {"status":500}
        }
        
    }catch(error){
        return {"status":500};
    }

}