import '../../assets/styles/FoodRecommendation.css';

import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function HealthResult() {
    const navigate = useNavigate();
    const locatoin = useLocation();
    const selected = locatoin.state?.selected || [];

    const avoidFoods = {
        1: ["탄수화물·당분, 포화지방"],
        2: ["나트륨"],
        3: ["질긴 / 딱딱한 음식"],
        4: ["나트륨"],
        5: ["자극적인 음식(매운, 신)"],
        6: ["가공식품·과다 당분 "],
        7: ["나트륨, 수분"],
    };

    return (
        <>
        <div className='Wrapper-food-recom'>
            <div className='fr'>이런 음식은 되도록</div>
            <div className='fr'>추천드리지 않을게요.</div>

            <div className='notrecomlist'>
            {selected.map((id) => (
                <div key={id} >
                    <ul>
                        {avoidFoods[id].map((food, index) => (
                            <li key={index} className='frlist'>{food}</li>
                        ))}
                    </ul>
                </div>
            ))}
            </div>

            <div className='frcfbox'>
                <button className='frbackbt' onClick={() => navigate("/health-status")}>돌아가기</button>
                <button className='frcfbt' onClick={() => navigate("/home")}>확인</button>
            </div>
        </div>
        </>
    )
}