import "../../assets/styles/Home.css";

import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const location = useLocation();
    const from = location.state?.from;
    const navigate = useNavigate();

    {/*login: <SectionLoigin /> 이슈포워딩 페이지*/}
    const sectionMap = {
        ordercompleted: <SectionWait />,
    };

    const defaultSection = <SectionDefault />;

    const [currentSection, setCurrentSection] = useState(sectionMap[from] || defaultSection);

    useEffect(() => {
        if (currentSection.type === SectionWait) {
            const timer = setTimeout(() => {
                setCurrentSection(<SectionDelivery />);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [currentSection]);

    return (
        <>
            <div className='Home-container1'>
            <img src='/icons/homebar.svg'></img>
            <div className='place'>
                <img src="/icons/place1.svg" height={20} ></img>
                <div className='pltext'>서대문구 대현동</div>
            </div>
            <div className='Home-case'>{currentSection}
            </div>
            <div className='home-box'>
                <img src="/images/home.png" className='bobby-home'></img>
            </div>
            </div>
            
            <div className='Home-container2'>
                <button className='type' onClick={() => navigate("/menu-search/text")}>
                    <img src="/icons/type.svg" style={{ pointerEvents: "none" }} width={20}></img>
                    <span className='home-type' style={{ pointerEvents: "none" }}>글자로 검색</span>
                </button>
                <button className='voice' onClick={() => navigate("/menu-search/voice")}>
                    <img src="/icons/mic.svg" style={{ pointerEvents: "none" }} width={20}></img>
                    <span className='home-voice' style={{ pointerEvents: "none" }}>음성으로 검색</span>
                </button>
            </div>

            <div className='Home-container3'>
                <div className='home-menu'>
                    <button className='menu-button'>
                        <img src='/icons/menu1.svg' width={66}></img>
                    </button>
                    <div className='menu-name'>국 · 찌개</div>
                </div>
                <div className='home-menu'>
                    <button className='menu-button'>
                        <img src='/icons/menu2.svg' width={66}></img>
                    </button>
                    <div className='menu-name'>밥</div>
                </div>
                <div className='home-menu'>
                    <button className='menu-button'>
                        <img src='/icons/menu3.svg' width={66}></img>
                    </button>
                    <div className='menu-name'>국</div>
                </div>
                <div className='home-menu'>
                    <button className='menu-button'>
                        <img src='/icons/menu4.svg' width={66}></img>
                    </button>
                    <div className='menu-name'>반찬</div>
                </div>
            </div>
            <div className='home-button'>
                <button className='home-recent' onClick={() => navigate("/current-order")}>최근 주문</button>
                <button className='home-recom' onClick={() => navigate("/menu-recommendation")}>✨ 음식 추천받기</button>
            </div>
        </>
    );
}

function SectionDefault() {
    return (
        <>
        <div className='q'>
            <div className='nickname'>영철</div>
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

function SectionDelivery() {
    return (
        <>
        <div className='bobby-comment'>
            <div className='bobby-ment'>배달 잘 받으셨나요?</div>
            <button className='bobby-button'>
                <div className='answer-text'>눌러서 답하기</div>
                <img src='/icons/ment.svg' width={6}></img>
            </button>
        </div>
        <div className='polygon'>
            <img src='/icons/polygon.svg' width={25.0264}></img>
        </div>
        </>
    );
}

function SectionMeal() {
    return (
        <>
        <div className='bobby-comment'>
            <div className='bobby-ment'>식사 잘 하셨나요?</div>
            <button className='bobby-button'>
                <div className='answer-text'>눌러서 답하기</div>
                <img src='/icons/ment.svg' width={6}></img>
            </button>
        </div>
        <div className='polygon'>
            <img src='/icons/polygon.svg' width={25.0264}></img>
        </div>
        </>
    );
}