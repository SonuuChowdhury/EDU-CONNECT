import './eventSection.css';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

function EventSection({params=[]}) {
    useEffect(() => {
        Aos.init({
            duration: 600,
            easing: 'ease-in-out',
            once: false,
            mirror: true,
        });
        console.log('AOS initialized');
    }, []);

    useEffect(() => {
        Aos.refresh();
    }, [params]);

    return <>
        {params.map((data) => (
            <div className='EventContainers' 
                 key={data.serial} 
                 style={{backgroundImage:`url(${data.photo})`}} 
                 data-aos='fade-up'>
            </div>
        ))}
    </>
}

export default EventSection;
