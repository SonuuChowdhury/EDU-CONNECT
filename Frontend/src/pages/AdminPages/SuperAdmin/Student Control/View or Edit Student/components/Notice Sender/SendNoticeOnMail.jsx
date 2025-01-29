/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react'
import './SendNoticeOnMail.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWandMagicSparkles} from '@fortawesome/free-solid-svg-icons'

import RephraseByGemeniAPI from '../../../../../../../api/AI Rephrase/RephraseByGemeniAPI.js'

export default function SendNoticeOnMail(params){
    const [name,setName]=useState("")
    const [designation, setDesignation]= useState("Admin")
    const [Subject, setSubject]=useState("")
    const [Content,setContent]=useState("")
    const [ContentLoading,setContentLoading]=useState(false)
    const [SendToAllStudents, SetSendToAllStudents] = useState(true)

    const [studentData, setStudentData] = useState(params.data);
    const [SelectedEmails,setSelectedEmails]=useState([])
    const [SelectAllStudents, setSelectAllStudents]=useState(false)

    useEffect(() => {
        if (SendToAllStudents) {
          let emails = studentData.map((item) => item.email); // No need for explicit return
          setSelectedEmails(emails);
        }else{
            setSelectedEmails([]);
        }
      }, [studentData, SendToAllStudents]);
      
    const OnStudentCardCLickHandeller=async(OperationalEmail)=>{
        if(SelectedEmails.includes(OperationalEmail)){
            const updatedEmailList =await  SelectedEmails.filter(email => email !== OperationalEmail);
            setSelectedEmails(updatedEmailList)
        }else{
            setSelectedEmails([...SelectedEmails, OperationalEmail])
        }
    }

    const SelectAllStudentsOnNoticeHandeller=async ()=>{
        if(!SelectAllStudents){
            let emails = studentData.map((item) => item.email); // No need for explicit return
            setSelectedEmails(emails);
        }else{
            setSelectedEmails([])
        }
    }

    const RephraseButtonHandeller=async()=>{
        try{
            setContentLoading(true)
            const RephrasedTextOutput = await RephraseByGemeniAPI(Content)

            if(RephrasedTextOutput.status==200){
                setContent(RephrasedTextOutput.text)
            }
        }finally{
            setContentLoading(false)
        }
    }
    return<>
    <div className="SendNoticeOnMailBackground" onClick={()=>params.onClose()}>
        <div className="SendNoticeOnMailContainer" onClick={(e)=>{
            e.stopPropagation()
        }}>
            <button className='SendNoticeOnMailCancelButton' onClick={()=>params.onClose()}>X</button>

            <span className="SendNoticeOnMailHeader">SEND NOTICE</span>

            <div className="NameAndDesignationInputArea">
                <div className="NameAndDesignationInputAreaName">
                    <span className='NameAndDesignationInputAreaNameSpan'>Name</span>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Eg. Sonu Chowdhury' className='NameAndDesignationInputAreaNameInput' />

                </div>
                <div className="NameAndDesignationInputAreaDesignation">
                    <span className='NameAndDesignationInputAreaDesignationSpan'>Dsignation</span>
                    <select className='NameAndDesignationInputAreaDesignationSelect' value={designation} onChange={(e)=>setDesignation(e.target.value)}>
                        <option value="Vice Principal">Vice Principal</option>
                        <option value="Principal">Principal</option>
                        <option value="Admin">Admin</option>
                        <option value="Registrar">Registrar</option>
                        <option value="Dean Academics">Dean Academics</option>
                        <option value="Dean Research and Development">Dean Research and Development</option>
                        <option value="Dean Student Affairs">Dean Student Affairs</option>
                        <option value="Exam Controller">Exam Controller</option>
    
                        <option value="EEE HOD">EEE HOD</option>
                        <option value="ECE HOD">ECE HOD</option>
                        <option value="CSE HOD">CSE HOD</option>
                        <option value="CSBS HOD">CSBS HOD</option>
                        <option value="ME HOD">ME HOD</option>
                        <option value="EE HOD">EE HOD</option>
    
                        <option value="EEE Course Coordinator">EEE Course Coordinator</option>
                        <option value="ECE Course Coordinator">ECE Course Coordinator</option>
                        <option value="CSE Course Coordinator">CSE Course Coordinator</option>
                        <option value="CSBS Course Coordinator">CSBS Course Coordinator</option>
                        <option value="ME Course Coordinator">ME Course Coordinator</option>
                        <option value="EE Course Coordinator">EE Course Coordinator</option>

                        <option value="Professor">Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Training and Placement Officer">Training and Placement Officer</option>
                        <option value="Library In-charge">Library In-charge</option>
                        <option value="Lab Technician">Lab Technician</option>
                        <option value="Administrative Officer">Administrative Officer</option>
                    </select>

                </div>
            </div>
            <div className="SubjectAndContentInputArea">
                <div className="SubjectAndContentInputAreaSubject">
                    <span className='SubjectAndContentInputAreaSubjectSpan'>
                        Subject
                    </span>
                    <input type="text" className='SubjectAndContentInputAreaSubjectInput' value={Subject} onChange={(e)=>setSubject(e.target.value)} placeholder='Eg. Exams Announcements' />
                </div>
                <div className="SubjectAndContentInputAreaContent">
                    <span className='SubjectAndContentInputAreaContentSpan'>Content</span>
                    <textarea disabled={ContentLoading}  className='SubjectAndContentInputAreaContentInput' value={Content} onChange={(e)=>setContent(e.target.value)} placeholder='Write the notice content here...' />
                    <button disabled={ContentLoading} onClick={RephraseButtonHandeller} title='Rephrase the overall message in just one click.' className='SubjectAndContentInputAreaContentInputRephraseButton'><FontAwesomeIcon className='SubjectAndContentInputAreaContentInputRephraseButtonIcon' icon={faWandMagicSparkles} />Rephrase</button>
                </div>
            </div>

            <div className='BreakLineNoticeSection'/>

            <div className="SendToSelectionSectionArea">
                <span className="SendToSelectionSectionSentToSpan">Send To:</span>
                <label className='SendToSelectionSectionSentToLabel'>
                    <input type="radio" className='SendToSelectionSectionSentToRadioInput' checked={SendToAllStudents} onClick={()=>SetSendToAllStudents((val)=>!val)} />
                    All Students
                </label>
                
                <label className='SendToSelectionSectionSentToLabel'>
                    <input type="radio" className='SendToSelectionSectionSentToRadioInput' checked={!SendToAllStudents} onClick={()=>SetSendToAllStudents((val)=>!val)}/>
                    Selective Students
                </label>
            </div>

            {!SendToAllStudents? 
            <div className="NoticeContainerStudentListContainer">
                <div className="NoticeContainerStudentListToolsAndFilters">

                </div>
                <div className="NoticeContainerStudentListTopControlAndLabels">
                    <span className="NoticeContainerStudentListTopControlAndLabelsSelectAll">
                        Select All :
                    </span>
                    <input type="checkbox" className='NoticeContainerStudentListTopControlAndLabelsSelectAllCheckBox' checked={SelectAllStudents} onClick={()=>setSelectAllStudents(val=>!val)} onChange={SelectAllStudentsOnNoticeHandeller} readOnly/>
                </div>
                {studentData.map((student)=>(
                    <div key={student.roll}className="NoticeContainerStudentListStudentCard" onClick={(e)=>{OnStudentCardCLickHandeller(student.email)
                        e.stopPropagation()
                    }}>
                        <input type="checkbox" checked={SelectedEmails.includes(student.email)} readOnly className='NoticeContainerStudentListStudentCardCheckBox'/>
                        <div className="NoticeContainerStudentListStudentCardRofile" style={student.isProfile? {backgroundImage:`url(${student.profile})`} : {backgroundImage:`url('/defaultProfile.jpg')`}} />
                        <div className="NoticeContainerStudentListStudentCardNameAndRoll">
                            <span className='NoticeContainerStudentListStudentCardName'>{student.name}</span>
                            <span className='NoticeContainerStudentListStudentCardRoll'>{student.roll}</span>
                        </div>
                        <span className="NoticeContainerStudentListStudentCardEmail">
                            {student.email}
                        </span>
                    </div>
                ))}
            </div> 
            :null}

            <div className="SendNoticeButtonSectionArea">
                <button className="SendNoticeButtonSectionCancelButton" onClick={()=>params.onClose()}>CANCEL</button>
                <button className="SendNoticeButtoonSectionSendButton">SEND</button>
            </div>
        </div>
    </div>
    </>

}