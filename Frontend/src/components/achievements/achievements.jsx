import './achievements.css'


function Achievements({params=[]}){

    return<>
        <div className="achievementContentSection">
        {params.map((data)=>(
            <div className="achievementContainer" key={data.serial}>
                <div className="achievementContainerPhoto" style={{backgroundImage:`url(${data.photo})`}}></div>
                <h2 className="achievementContainerTitle">{data.tittle}</h2>
                <p className='achievementContainerDescription'>{data.description}</p>
                
                
            </div>
        ))}
        </div>
    </>


}

export default Achievements;