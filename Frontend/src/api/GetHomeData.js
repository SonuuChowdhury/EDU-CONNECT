import axios from "axios"


// Home page
export async function FetchAllHomePageData(){
    try{
        const response=await axios.get('https://institute-site-az-bug-busters.onrender.com/api/home')
        const data=await response.data
        console.log(data)
        return data
    }
    catch(error){
        console.log("Error While Fetching!")
        console.log(`${API_LINK}/api/home`)
    }
}



  
  