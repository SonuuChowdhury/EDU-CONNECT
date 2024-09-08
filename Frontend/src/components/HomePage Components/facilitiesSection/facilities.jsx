/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import './facilities.css'

import Aos from 'aos';
import 'aos/dist/aos.css';

function FacilitiesSection({params=[]}){

    useEffect(() => {
        Aos.init({
            duration: 600,
            easing: 'ease-in-out',
            once: false,
            mirror: true,
        });
    }, []);

    useEffect(() => {
        Aos.refresh();
    }, [params]);

    return<>
        <div className="facilitiesContentAreaMain">
            {params.map((data)=>(
                <div className="facilitiesContainer" key={data.serial} data-aos='fade-up'>
                    <div className="facilitiesContainerPhoto" style={{backgroundImage:`url(${data.photo})`}}></div>
                    <h3>{data.title}</h3>

                </div>
            ))}
        </div>
    
    </>

}

export default FacilitiesSection