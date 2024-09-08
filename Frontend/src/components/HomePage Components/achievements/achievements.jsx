/* eslint-disable react/prop-types */
import { useEffect } from 'react';

import './achievements.css'

import Aos from 'aos';
import 'aos/dist/aos.css';


function Achievements({params=[]}){
      // animation on scroll config
  useEffect(() => {
    Aos.init({
        duration: 600,
        easing: 'ease-in-out',
        once: false,
        mirror: true,
        offset:100,
    });
    }, []);

    useEffect(() => {
        Aos.refresh();
    }, [params]);

    return<>
        <div className="achievementContentSection">
        {params.map((data)=>(
            <div className="achievementContainer" key={data.serial} data-aos='fade-up'>
                <div className="achievementContainerPhoto" style={{backgroundImage:`url(${data.photo})`}}></div>
                <h2 className="achievementContainerTitle">{data.tittle}</h2>
                <p className='achievementContainerDescription'>{data.description}</p>
                
                
            </div>
        ))}
        </div>
    </>


}

export default Achievements;