import './MasterSectionEditor.css'
import '../../Dashboard/Dashboard.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare,faEye,faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import BasicNavbar from '../../../../../components/basicNavbar/basicNavbar'
import Loader from '../../../../../components/loader/loader'
import TryAgainTopBarPopup from '../../../../../components/tryAgain/tryAgain'
import Unauthorized from '../../../../../components/Errors/Unauthorized'
import MasterPhotoViewPopUp from './Master Section Componenets/View Image/MasterSectionViewPopUp'

import GetHomePageContent from '../../../../../api/Home Page contents/Get/GetHomePageContent'

export default function MasterSectionEditor(){
    const navigate=useNavigate()

    const [isLoading,setIsLoading]=useState(false)
    const [MasterSectionData , setMasterSectionData] = useState([])
    const [errorStatus, setErrorStatus] = useState(null);
    const [ShowTopUp,SetShowTopUp]=useState(false)
    const [Authorized,setAuthorized]=useState(true)
    const [refresh,setRefresh]=useState(false)
    const [selectedPopUpLink,setSelectedPopUpLink]=useState('')

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = (link) => {
        setSelectedPopUpLink(link)
        setIsPopupOpen(true)
    }
    const closePopup = () => setIsPopupOpen(false);
    

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true); // Start loading before fetching data
            try {
                const data = await GetHomePageContent(0);
                if (data.response === 403) {
                    setAuthorized(false);
                } else if (data.status === 200) {
                    setMasterSectionData(data.data);
                } else {
                    setErrorStatus(500);
                    SetShowTopUp(true)
                }
            } catch (err) {
                console.log(err);
                if(err.status==403){
                    setAuthorized(false)
                }
                setErrorStatus(500); // Optional: Set error status to display an error message
                SetShowTopUp(true)
            } finally {
                setIsLoading(false); // Stop loading after fetching data
            }
        };
    
        getData();
    }, [refresh]);
 
    useEffect(() => {
        if (ShowTopUp) {
            const timer = setTimeout(() => {
                SetShowTopUp(false);
                setRefresh(false)
            }, 3000); 
            return () => clearTimeout(timer);
        }
    }, [ShowTopUp,refresh]);
    
    return <>
        <BasicNavbar/>
        {isLoading ? <Loader/> :null}
        {Authorized?null:<Unauthorized/>}
        {ShowTopUp ? <TryAgainTopBarPopup status={errorStatus} /> : null}


        <div className="TopAreaDashboard">
            <span className="SuperAdminHeaders">
                <span className="SuperAdminHeader">WELCOME SUPER ADMIN</span>
                <span className="SuperAdminSubHeader">MASTER SECTION</span>
            </span>
            <button className="SuperAdminLogOutFeature" onClick={()=>navigate('/super-admin/admin-dashboard')}>{<FontAwesomeIcon icon={faArrowUpRightFromSquare}/>} Dashboard</button>
        </div>

        <div className="dataTableAreaOfMasterPhotos">
            <table className='dataTableOfMasterPhotos'>
                <thead>
                    <tr>
                        <th className='MasterSectionTableHeader'>_id</th>
                        <th className='MasterSectionTableHeader'>Serial</th>
                        <th className='MasterSectionTableHeader'>Tittle</th>
                        <th className='MasterSectionTableHeader'>View Photo</th>
                        <th className='MasterSectionTableHeader'>Edit Details</th>
                    </tr>
                </thead>
                <tbody>
                    {MasterSectionData.map((data)=>(
                        <tr key={data.serial}>
                            <td className='MasterSectionTableData'>{data._id}</td>
                            <td className='MasterSectionTableData'>{data.serial}</td>
                            <td className='MasterSectionTableData'>{data.title}</td>
                            
                            <td className='MasterSectionTableData anchorCentre'>
                                <a onClick={()=>openPopup(data.link)} target="_blank" rel="noopener noreferrer" className='MastersectionTablesIcon'>
                                    <FontAwesomeIcon icon={faEye} />
                                </a>
                            </td>
                            <td className='MasterSectionTableData anchorCentre'>
                                <a target="_blank" rel="noopener noreferrer" className='MastersectionTablesIcon'>
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </a>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>



        </div>

        <MasterPhotoViewPopUp isOpen={isPopupOpen} onClose={closePopup} link={selectedPopUpLink} />

    </>
}