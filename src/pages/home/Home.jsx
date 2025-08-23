import "../../assets/styles/Home.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../api';

export default function Home() {
    console.log("토큰:", localStorage.getItem("token"));
    const location = useLocation();
    const from = location.state?.from; // 이전 페이지 정보
    const navigate = useNavigate();
    
    // 사용자 정보 상태
    const [user, setUser] = useState({ username: "", district_name: "" });
    const [section, setSection] = useState(from || 'default');

    // API로 사용자 정보 가져오기
    useEffect(() => {
        console.log("토큰:", localStorage.getItem("token"));
        api.get('/api/accounts/user/')  // DRF 뷰셋 URL
            .then(res => {
                setUser(res.data);
                console.log("유저 정보:", res.data);
            })
            .catch(err => console.error("사용자 정보 로드 실패:", err));
    }, []);

    // 섹션 전환 (wait → delivery)
    useEffect(() => {
        if (section === 'wait') {
            const timer = setTimeout(() => setSection('delivery'), 5000);
            return () => clearTimeout(timer);
        }
    }, [section]);

    // 카테고리 클릭
    const handleCategoryClick = (categoryValue) => {
        console.log("선택된 카테고리:", categoryValue);
        navigate(`/menu/search/result?category=${categoryValue}`);
    }

    // 섹션 맵
    const sectionMap = {
        default: <SectionDefault user={user} />,
        wait: <SectionWait />,
        delivery: <SectionDelivery navigate={navigate} />,
    };

    return (
        <>
            <div className='Home-container1'>
                <img src='/icons/homebar.svg' alt="homebar" />
                <div className='place'>
                    <img src="/icons/place1.svg" height={20} alt="place"/>
                    <div className='pltext'>서대문구 {user.district_name}</div>
                </div>
                <div className='Home-case'>{sectionMap[section]}</div>
                <div className='home-box'>
                    <img src="/images/home.png" className='bobby-home' alt="bobby"/>
                </div>
            </div>

            <div className='Home-container2'>
                <button className='type' onClick={() => navigate("/menu/search/text")}>
                    <img src="/icons/type.svg" style={{ pointerEvents: "none" }} width={20} alt="type"/>
                    <span className='home-type' style={{ pointerEvents: "none" }}>글자로 검색</span>
                </button>
                <button className='voice' onClick={() => navigate("/menu/search/voice")}>
                    <img src="/icons/mic.svg" style={{ pointerEvents: "none" }} width={20} alt="mic"/>
                    <span className='home-voice' style={{ pointerEvents: "none" }}>음성으로 검색</span>
                </button>
            </div>

            <div className='Home-container3'>
                {["국 · 찌개", "밥", "죽", "반찬"].map((name, idx) => (
                    <div className='home-menu' key={idx}>
                        <button className='menu-button' onClick={() => handleCategoryClick(`${idx}`)}>
                            <img src={`/icons/menu${idx+1}.svg`} width={66} alt={name}/>
                        </button>
                        <div className='menu-name'>{name}</div>
                    </div>
                ))}
            </div>

            <div className='home-button'>
                <button className='home-recent' onClick={() => navigate("/menu/current-order")}>최근 주문</button>
                <button className='home-recom' onClick={() => navigate("/menu/recommendation")}>✨ 음식 추천받기</button>
            </div>
        </>
    );
}

// ========================= Sections =========================
function SectionDefault({ user }) {
    return (
        <>
            <div className='q'>
                <div className='nickname'>{user.username}</div>
                <div className='q1'>님, 오늘은</div>
            </div>
            <div className='q1'>무엇을 드시고 싶으세요?</div>
        </>
    );
}

function SectionWait() {
    return (
        <>
            <div className='q'>
                <div className='nickname'>약 30분 뒤</div>
                <div className='q1'>에</div>
            </div>
            <div className='q1'>음식이 도착합니다.</div>
        </>
    );
}

function SectionDelivery({ navigate }) {
    return (
        <>
            <div className='bobby-comment'>
                <div className='bobby-ment'>배달 잘 받으셨나요?</div>
                <button className='bobby-button' onClick={() => navigate("/delivery-feedback/check")}>
                    <div className='answer-text'>눌러서 답하기</div>
                    <img src='/icons/ment.svg' width={6} alt="ment"/>
                </button>
            </div>
            <div className='polygon'>
                <img src='/icons/polygon.svg' width={25.0264} alt="polygon"/>
            </div>
        </>
    );
}