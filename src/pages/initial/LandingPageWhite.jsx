import '../../assets/styles/LandingPage.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPageWhite() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/health-status");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
        <div className='Wrapper-white'>
            <img src="/icons/initial2.svg" className='lp1favicon'></img>
        </div>
        </>
    );
}