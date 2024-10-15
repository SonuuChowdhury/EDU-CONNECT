/* eslint-disable react/prop-types */
import './MasterSectionViewPopUp.css'

export default function MasterPhotoViewPopUp({ isOpen, onClose, link }) {
    if (!isOpen) return null; // Do not render the popup if it is not open

    console.log(link)


    return (
        <div className="MasterPhotoViewPopUpOverlay" onClick={onClose}>
            <div className="MasterPhotoViewPopUpContent" onClick={(e) => e.stopPropagation()}>
                <div className="MasterPhotoViewPopUpBody" style={{backgroundImage:`url(${link})`}} />
            </div>
        </div>
    );
}