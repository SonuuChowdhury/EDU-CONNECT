import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';

import './MasterSectionUploadAndEditPopUp.css';

import UpdateMasterSectionDetails from '../../../../../../../api/Home Page contents/Change/UpdateMasterSectionDetails.js';

import TryAgainTopBarPopup from '../../../../../../../components/tryAgain/tryAgain.jsx';
import Loader from '../../../../../../../components/loader/loader.jsx';

function shortenLog(log) {
  if (log.length <= 50) return log;
  const ext = log.substring(log.lastIndexOf('.'));
  return log.substring(0, 30) + '...' + log.substring(log.lastIndexOf('.') - 10, log.lastIndexOf('.')) + ext;
}

export default function MasterSectionUploadAndEditPopUP(params) {

  const [itemData,setItemData]=useState(params.itemData)
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataChanged,setDataChanged]=useState(false)
  const [fileError, setFileError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const [isLoading, SetIsLoading] = useState(false);
  const [reload, SetReload] = useState(false);

  const [ShowTopMessageBar, setShowTopMessageBar] = useState(false);
  const [TopMessageBarStatus, setTopMessageBarStatus] = useState();

  const [DisplayFileName, setDisplayFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    validateFile(file);
  };

  const validateFile = (file) => {
    if (file && file.size < 10 * 1024 * 1024) {
      setSelectedFile(file);
      setFileError('');
      setDisplayFileName(shortenLog(file.name));
    } else {
      setSelectedFile(null);
      setFileError('File must be less than 10MB.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    validateFile(file);
  };

  useEffect(() => {
    if (ShowTopMessageBar) {
      const timer = setTimeout(() => {
        setShowTopMessageBar(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [ShowTopMessageBar]);

  useEffect(() => {
    setTimeout(() => {
      reload ? window.location.reload() : null;
    }, 3000);
  }, [reload]);

  const handelUpdateItem = async () => {
    SetIsLoading(true);
    try {
      const UploadStatus = await UpdateMasterSectionDetails(selectedFile, itemData);
      if (UploadStatus.status === 500) {
        setTopMessageBarStatus(500);
        setShowTopMessageBar(true);
      } else if (UploadStatus.status === 200) {
        setTopMessageBarStatus(9);
        setShowTopMessageBar(true);
        SetReload(true);
      }
    } catch (err) {
      console.log(err);
      setTopMessageBarStatus(9);
      setShowTopMessageBar(true);
    } finally {
      SetIsLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    SetIsLoading(true);
    try {
      const RemoveStatus = await UpdateMasterSectionDetails(selectedFile, params.StudentData, true);
      if (RemoveStatus.status == 200) {
        setTopMessageBarStatus(10);
        setShowTopMessageBar(true);
        SetReload(true);
      }
      if (RemoveStatus.status == 500) {
        setTopMessageBarStatus(500);
        setShowTopMessageBar(true);
      }
    } catch (err) {
      setTopMessageBarStatus(500);
      setShowTopMessageBar(true);
    } finally {
      SetIsLoading(false);
    }
  };

  // Close the popup on background click
  const handleClosePopup = () => {
    params.onClose();
  };

  return (
    <div className="MasterSectionUpdaterOverlay" onClick={handleClosePopup}>
      <div
        className="MasterSectionUpdaterPopup"
        onClick={(e) => e.stopPropagation()}
      >
        {ShowTopMessageBar ? <TryAgainTopBarPopup status={TopMessageBarStatus} /> : null}
        {isLoading ? <Loader /> : null}
        <h2>UPDATE HOME SECTION</h2>
        <span className='MasterSectionEditItemID'>For: {itemData._id}</span>
        <div
          className={`MasterSectionUpdaterUploadBox ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label htmlFor="upload" className="MasterSectionUpdaterUploadIcon">
            <FontAwesomeIcon icon={faImages} size="3x" />
          </label>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
          <p>{selectedFile ? `SELECTED FILE: ${DisplayFileName}` : (isDragging ? 'DROP THE FILE HERE' : 'DRAG OR SELECT FILE')}</p>
        </div>
        {fileError && <p className="MasterSectionUpdaterFileError">{fileError}</p>}
        
        <input type="text" className='MasterPhotoTitleInput' value={itemData.title} onChange={(e)=>{
          setItemData({...itemData , title:e.target.value})
          setDataChanged(true)

        }} />
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button
            className="MasterSectionUpdaterUploadBtn"
            disabled={!dataChanged}
            onClick={handelUpdateItem}
          >
            UPDATE
          </button>
          <button
            className="MasterSectionUpdaterRemoveBtn"
            onClick={handleDeleteItem}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
