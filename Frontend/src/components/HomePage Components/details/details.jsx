/* eslint-disable react/prop-types */
import './details.css'

function DetailsSection({ params = [] }) {
    return (
        <>
            {params.map((data, index) => (
                <div className='DeatilsArea' key={index} style={{ backgroundImage: `url(${data.backgroundPhoto})` }}>
                    <div className="detailsOverlay">
                        <div className="detailsContainer profCountDetails">
                            <span className="detailsNumber profCountDetailsNumber">{data.profCount}</span>
                            <p className='detailsTitle profCountDetailsTitle'>PROFESSIONAL FACULTIES</p>
                        </div>
                        <div className='detailsContainer courseCountDetails'>
                            <span className="detailsNumber courseCountDetailsNumber">{data.courseCount}</span>
                            <p className='detailsTitle courseCountDetailsTitle'>PROFESSIONAL COURSES</p>
                        </div>
                        <div className="detailsContainer studentsDetails">
                            <span className="detailsNumber studentsDetailsNumber">{data.currentStudentCount}+</span>
                            <p className='detailsTitle studentsDetailsTitle'>PRESENT STUDENTS</p>
                        </div>
                        <div className="detailsContainer alumniDetails">
                            <span className="detailsNumber alumniDetailsNumber">{data.alumniCount}+</span>
                            <p className='detailsTitle alumniDetailsTitle'>ESTABLISHED ALUMNI</p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default DetailsSection;
