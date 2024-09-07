function Achievements({params=[]}){

    return<>
        {params.map((data)=>(
            <div className="achievementContainer" key={data.serial}>
                <h3 className="achievementContainerTitle">{data.title}</h3>
            </div>


        ))}
        
    
    </>


}

export default Achievements;