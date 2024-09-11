/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './faqs.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Faqs({ params = [] }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        Aos.init({
            duration: 500,
            easing: 'ease-in-out',
            once: true,
            mirror: true,
        });
    }, []);

    useEffect(() => {
        Aos.refresh();
    }, [params]);

    return (
        <div className="faqs-area">
            {params.map((data, index) => (
                <div
                    className="faq-question-container"
                    key={data.serial}
                    data-aos='fade-up'
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className="faq-question">
                        <h3 className={`faq-title ${hoveredIndex === index ? 'hovered' : ''}`}>
                            Q. {data.question}
                        </h3>
                        <div
                            className={`arrow-icon ${hoveredIndex === index ? 'rotate' : ''}`}
                            style={{ backgroundImage: `url('/downArrow.png')` }}
                        ></div>
                    </div>

                    <div className={`faq-answer ${hoveredIndex === index ? 'visible' : ''}`}>
                        <p>{data.answer}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Faqs;
