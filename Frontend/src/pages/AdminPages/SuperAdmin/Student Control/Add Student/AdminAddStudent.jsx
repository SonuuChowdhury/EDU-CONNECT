import './AdminAddStudent.css'
import '../../Dashboard/Dashboard.css'

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

import Loader from '../../../../../components/loader/loader'
import Unauthorized from '../../../../../components/Errors/Unauthorized'

import BasicNavbar from '../../../../../components/basicNavbar/basicNavbar'

import SuperAdminAuth from '../../../../../api/Auth/SuperAdminAuth'

export default function AdminAddStudent(){
    const [isLoading, setisLoading] = useState(false);
    const [Authorized, setAuthorized] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const CheckAuth = async ()=>{
            setisLoading(true)
            try{
                const SuperAdminAuthData =await SuperAdminAuth()
                if(SuperAdminAuthData.status==200){
                    setAuthorized(true)
                }else{
                    setAuthorized(false)
                }
            }catch(err){
                console.log(err)
            }finally{
                setisLoading(false)
            }
        }
        CheckAuth()
    },[])

    return <>
    <BasicNavbar/>

    {isLoading?<Loader/>:null}
    {Authorized?null:<Unauthorized/>}

    <div className="TopAreaDashboard">
            <span className="SuperAdminHeaders">
                <span className="SuperAdminHeader">WELCOME SUPER ADMIN</span>
                <span className="SuperAdminSubHeader">ADD STUDENT SECTION</span>
            </span>
            <button className="SuperAdminLogOutFeature" onClick={() => navigate('/super-admin/admin-dashboard')}>
                {<FontAwesomeIcon icon={faArrowUpRightFromSquare}/>} Dashboard
            </button>
    </div>






    
    </>
}