/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import './faqs.css'

import Aos from 'aos';
import 'aos/dist/aos.css';

function Faqs({params=[]}){
    useEffect(() => {
        Aos.init({
            duration: 600,
            easing: 'ease-in-out',
            once: false,
            mirror: true,
            offset:20,
        });
    }, []);

    useEffect(() => {
        Aos.refresh();
    }, [params]);

    return <div className="faqsArea">
        {params.map((data)=>(
            <div className="faqQuestionContainer" key={data.serial} data-aos='fade-left'>
                <h3 className='faqQuestions'>Q. {data.question}</h3>
                <div className='downArrow' style={{backgroundImage:`url('/downArrow.png')`}}></div>
            </div>
        ))}

    </div>

}

export default Faqs