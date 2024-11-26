/* eslint-disable no-unused-vars */
import './EditSubject.css'
import { useEffect, useState, useRef } from 'react'

import GetStudentAttendanceData from '../../../../../api/Dashboard Data/Student/GetStudentAttendanceData';

export default function EditSubject(params){
    const [Name,SetName] = useState(params.data.name);
    const [SubjectType, SetSubjectType] = useState(params.data.subjectType);
    const [PresentData,SetPresentData]= useState(params.data.TotalPresent)
    const [TotalData, SetTotalData] = useState(params.data.TotalPresent+ params.data.TotalAbsent)

    const [AttendanceDataChanged, SetAttendanceDataChanged]= useState(false)

    const [IsError, SetIsError]= useState(false)
    const [ErrorMsg, SetErrorMsg]= useState("Error")

    const [isLoading, setisLoading] = useState(false);


    // Ref to track first render
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; // Set to false after the first render
            return; // Skip running the effect for the first render
        }

        if( PresentData == params.data.TotalPresent && TotalData == params.data.TotalPresent+ params.data.TotalAbsent){
            SetAttendanceDataChanged(false);
            return;
        }
        
        SetAttendanceDataChanged(true);
    }, [PresentData, TotalData, params.data.TotalAbsent, params.data.TotalPresent]);


    const UpdateSubjectDataHandeller=async()=>{
        const UpdateData={
            roll:Number(params.roll),
            editData:true,
            name:Name,
            SubjectType:Number(SubjectType),
            isAttendanceDataChanged:AttendanceDataChanged,
            NewTotalPresent:Number(PresentData),
            NewTotalAbsent:Number(TotalData)-Number(PresentData),
            newSubjectType:Number(SubjectType),
            currentSubjectName:params.data.name,
            newSubjectName:Name
        }
        setisLoading(true)
        try{
            const ResponseData = await GetStudentAttendanceData(UpdateData)
            if(ResponseData.status==200){
                params.UpdateData(ResponseData.data.updatedAttendance)
                SetErrorMsg("Subject Updated Successfully")
                SetIsError(true)
                closeHandeller();
            }else{
                SetErrorMsg(ResponseData.response.data.message)
                SetIsError(true)
            }
        }finally{
            setisLoading(false)
        }
    }


    const closeHandeller=()=>{
        setTimeout(() => {
            params.onClose()
        }, 1000 );
    }

    return<>
        {isLoading? 
            <div className="loaderSpinnerbackground">
                <div className="LoaderSpinner"></div>
            </div>
        : null}

        <div className="EditSubjectBackground" onClick={(e)=>{
            e.stopPropagation()
            
        }}>
            <div className="EditSubjectEditingBox">
                <span className="EditSubjectEditingBoxHeader">
                    EDIT SUBJECT
                </span>
                <div className="EditSubjectEditingBoxNameArea">
                    <span className="EditSubjectEditingBoxName">Name: </span>
                    <input type="text" className="EditSubjectEditingBoxNameInput" value={Name} onChange={(e)=>SetName(e.target.value)}/>
                </div>
                <div className="EditSubjectEditingBoxSubjectTypeArea">
                    <span className='EditSubjectEditingBoxSubjectType'>Subject Type: </span>
                    <select className='EditSubjectEditingBoxSubjectTypeOptions' value={SubjectType} onChange={(e)=>SetSubjectType(e.target.value)}>
                        <option value="1">Theory</option>
                        <option value="2">Lab</option>
                    </select>
                </div>
                {AttendanceDataChanged?(
                    <span className="EditSubjectEditingBoxNoteText">
                        Warning: Editing attendance will delete all date-wise records.(Ignore if no changes are made)
                    </span>
                ):null}
                <div className="EditSubjectEditingBoxAttendaceArea">
                    <span className='EditSubjectEditingBoxAttendacePresent'>Present: </span>
                    <input type="text" className="EditSubjectEditingBoxAttendacePresentInput" value={PresentData} onChange={(e)=>SetPresentData(e.target.value)} />
                    <span className='EditSubjectEditingBoxAttendaceAbsent'>Total: </span>
                    <input type="text" className="EditSubjectEditingBoxAttendaceAbsentInput" onChange={(e)=>SetTotalData(e.target.value)} value={TotalData}/>
                </div>

                {IsError? (
                    <div className="EditSubjectEditingBoxErrorArea">
                        <span className="EditSubjectEditingBoxErrorAreaMsg">
                            {ErrorMsg}
                        </span>
                    </div>
                ):null}

                <div className="EditSubjectEditingBoxButtonArea">
                    <button className="EditSubjectEditingBoxButtonCancel" onClick={params.onClose}>Cancel</button>
                    <button className="EditSubjectEditingBoxButtonUpdate" onClick={UpdateSubjectDataHandeller}>Update</button>
                </div>
            </div>
        </div>
    </>
}