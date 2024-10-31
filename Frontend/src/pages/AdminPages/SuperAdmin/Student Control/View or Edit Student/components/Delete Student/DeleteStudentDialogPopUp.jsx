/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './DeleteStudentDialogPopUp.css';

import TryAgainTopBarPopup from '../../../../../../../components/tryAgain/tryAgain';
import DeleteStudentByRole from '../../../../../../../api/Student Control APIs/DeleteStudentAPI.js';

import Loader from '../../../../../../../components/loader/loader.jsx';

export default function DeleteStudentOptionBox({ isOpen, onClose, data }) {
    const [isClosing, setIsClosing] = useState(false);

    const [errorStatus, setErrorStatus] = useState(null)
    const [ShowTopUp, SetShowTopUp] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    // Handle closing animation
    const handleClose = () => {
        setIsClosing(true);
        onClose();
    }

    const RefreshPage = async()=>{
        setTimeout(() => {
            window.location.reload()
        }, 3000);
    }

    // Handle delete confirmation
    const handleDelete = async() => {
        setIsLoading(true)
        try{
            const ResponseData = await DeleteStudentByRole(data.roll)
            if(ResponseData.status == 200){
                setErrorStatus(21)
                SetShowTopUp(true)
                RefreshPage()
            }else if(ResponseData.status==400){
                setErrorStatus(22)
                SetShowTopUp(true)
            }
        }catch(error){
            setErrorStatus(500)
            SetShowTopUp(true)
        }finally{
            setIsLoading(false)
        }
        
    };

    // Return null if not open
    if (!isOpen && !isClosing) return null;

    return (
        <div className="deleteStudentBoxOverlay" onClick={handleClose}>
            {isLoading ? <Loader/> : null}
            {ShowTopUp? <TryAgainTopBarPopup status={errorStatus}/> : null}
            <div
                className={`deleteStudentBoxContent ${isClosing ? 'DeleteBoxZoomOut' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="deleteConfirmationHeader">Are you sure?</div>
                <div className="deleteStudentRoll">Roll Number: {data.roll}</div>
                <div className="deleteWarningMessage">
                    This action cannot be undone. Please confirm to proceed.
                </div>
                <div className="deleteButtonContainer">
                    <button className="deleteCancelButton" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="deleteConfirmButton" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
