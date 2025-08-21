import '../../assets/styles/Nutrition.css';

import Nutrition from './nutrition';

import { useNavigate } from 'react-router-dom';

export default function NutritionGuard() {
    const navigate = useNavigate();

    return (
        <div className='Wrapper-nu-guard'>
            <div className='guard'>
                <button className='guard-2'>
                    <button className='guard-1' onClick={() => navigate("/guard/report/nutriton")}>영양 보고서</button>
                    <div className='guard-2-text'>건강 보고서</div>
                </button>
            </div>
            <div className='nu-guard-scroll'>
                <Nutrition />
            </div>
        </div>
    );
}