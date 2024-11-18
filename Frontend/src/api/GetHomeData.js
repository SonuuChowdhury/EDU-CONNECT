import axios from "axios"


// Home page
export async function FetchAllHomePageData(){
    try{
        const response=await axios.get('https://advanced-institute-management-portal.onrender.com/api/home')
        const data=await response.data
        return data
    }
    catch(error){
        console.log("Error While Fetching!")
    }
}


  
  