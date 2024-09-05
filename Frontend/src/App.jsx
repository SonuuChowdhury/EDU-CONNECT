import './styles/App.css'
import { FetchAllHomePageData } from './api/GetHomeData'

// Components 
import HeadNav from './components/HeadNav/headNav'
import Navbar from './components/Navbar/navbar'

async function GetHomeData(){
    const data=await FetchAllHomePageData();
    console.log(data)
}

function App() {
    GetHomeData()

    return <>
        <HeadNav></HeadNav>
        <Navbar></Navbar>
    </>

}

export default App
