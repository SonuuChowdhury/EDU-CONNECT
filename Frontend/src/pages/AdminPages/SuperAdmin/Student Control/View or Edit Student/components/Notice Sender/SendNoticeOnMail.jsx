/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react'
import './SendNoticeOnMail.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWandMagicSparkles} from '@fortawesome/free-solid-svg-icons'

import RephraseByGemeniAPI from '../../../../../../../api/AI Rephrase/RephraseByGemeniAPI.js'

import DataNotFound from '../../../../../../../components/Data Not found/DataNotFound.jsx'

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

    const [semFilterValue, setSemFilterValue]= useState(0)
    const [DeptFilterValue, SetDeptFilterValue]= useState("0")
    const [DataEmpty, SetDataEmpty]= useState(false)

    const [SendingMails, SetSendingMails]= useState(false)

    useEffect(() => {
        if (SendToAllStudents) {
          let emails = studentData.map((item) => item.email); // No need for explicit return
          setSelectedEmails(emails);
        }else{
            setSelectedEmails([]);
        }
      }, [studentData, SendToAllStudents]);

    const SendButtonHandeller=async()=>{
        const NoticeData = {
            Name:name,
            Designation:designation,
            Subject:Subject,
            Content:Content,
            emails:SelectedEmails
        }
        params.SendNotice(NoticeData)
    }
      
    const OnStudentCardCLickHandeller=async(OperationalEmail)=>{
        if(SelectedEmails.includes(OperationalEmail)){
            const updatedEmailList =await  SelectedEmails.filter(email => email !== OperationalEmail);
            setSelectedEmails(updatedEmailList)
        }else{
            setSelectedEmails([...SelectedEmails, OperationalEmail])
        }
    }
    
    const OnSemFilterValueChange=async(e)=>{
        setSelectedEmails([])
        setSemFilterValue(e.target.value)
        const SelectedSem= e.target.value;
        const FilterResult = params.data.filter(student=>student.semester==SelectedSem)
        setStudentData(FilterResult)
        if(FilterResult.length==0){
            SetDataEmpty(true)
        }else{
            SetDataEmpty(false)
        }
        if(SelectedSem==0){
            SetDataEmpty(false)
            setStudentData(params.data)
        }
    }

    const OnDeptFilterValueChanged=(e)=>{
        setSelectedEmails([])
        SetDeptFilterValue(e.target.value)
        const SelectedDept= e.target.value;
        const FilterResult = params.data.filter(student=>student.department.toLowerCase().includes(SelectedDept.toLowerCase()))
        setStudentData(FilterResult)
        console.log(FilterResult)
        if(FilterResult.length==0){
            SetDataEmpty(true)
        }else{
            SetDataEmpty(false)
        }
        if(SelectedDept==0){
            SetDataEmpty(false)
            setStudentData(params.data)
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
                    <span className='NoticeStudentListFiltersSpan'>Filters: </span>


                    <div className="NoticeStudentListFiltersFiltersSection">
                        <span className='NoticeStudentListFiltersSpanSemSpan'>Semester</span>
                        <select value={semFilterValue} onChange={OnSemFilterValueChange} className='NoticeStudentListFiltersSpanSemDropDown'> 
                            <option value="0">All</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>

                    <div className="NoticeStudentListFiltersSpanDeptFilter">
                        <span className='NoticeStudentListFiltersSpanDeptFilterSpan'>Department</span>
                        <select onChange={OnDeptFilterValueChanged} value={DeptFilterValue} className='NoticeStudentListFiltersSpanDeptFilterDropDown'> 
                            <option value="0">All</option>
                            <option value="Electrical and Electronics Engineering">EEE</option>
                            <option value="Electronics and Communication Engineering">ECE</option>
                            <option value="Computer Science Engineering">CSE</option>
                            <option value="Computer Science and Business Studies">CSBS</option>
                            <option value="Mechanical Engineering">ME</option>
                            <option value="Electrical Engineering">EE</option>
                        </select>
                    </div>

                </div>
                <div className="NoticeContainerStudentListTopControlAndLabels">
                    <span className="NoticeContainerStudentListTopControlAndLabelsSelectAll">
                        Select All :
                    </span>
                    <input type="checkbox" className='NoticeContainerStudentListTopControlAndLabelsSelectAllCheckBox' checked={SelectAllStudents} onClick={()=>setSelectAllStudents(val=>!val)} onChange={SelectAllStudentsOnNoticeHandeller} readOnly/>
                </div>
                {DataEmpty ? <DataNotFound/>:null}
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
                <button className="SendNoticeButtoonSectionSendButton" onClick={SendButtonHandeller} disabled={SelectedEmails.length==0 || name=="" || Content=="" || Subject==""} title={
                    SelectedEmails.length === 0 
                    ? "No emails selected" 
                    : name === "" 
                    ? "Name is required" 
                    : Content === "" 
                    ? "Content cannot be empty" 
                    : Subject === "" 
                    ? "Subject is required" 
                    : ""
                } >SEND</button>
            </div>
        </div>
    </div>
    </>

}