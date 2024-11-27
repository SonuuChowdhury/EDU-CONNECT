import axios from "axios"

// Home page
export async function FetchAllHomePageData(){
    try{
        const data =await axios.get('https://advanced-institute-management-portal.onrender.com/api/home')
        return data;
    }
    catch(error){
        if(error.response){
            return error;
        }
        console.log("Error While Fetching!")
    }
}


  
  