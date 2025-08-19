import '../../assets/styles/LandingPage.css';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage1() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/health-status");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
        <div className='Wrappe'>
            <img src="./initial2.svg" className='lp1favicon'></img>
        </div>
        </>
    );
}