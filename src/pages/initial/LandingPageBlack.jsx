import '../../assets/styles/LandingPage.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPageBlack() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/landing-page/White");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
        <div className='Wrapper-black'>
            <img src="/icons/initial1.svg" className='lpfavicon'></img>
        </div>
        </>
    );
}