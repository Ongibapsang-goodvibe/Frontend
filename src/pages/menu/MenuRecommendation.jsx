import "../../assets/styles/Review.css";
import "../../assets/styles/SearchResult.css";

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function MenuRecommentadion() {
    const navigate = useNavigate();

    const [selectedIdx, setSelectedIdx] = useState(null);

    const menuRecomList = [
        { imgSrc: "/images/food1.png", tag: "지방 위주 식사", name: "콩나물 순두부국", carbsPercent: "50", proteinPercent: "30", fatPercent: "20" },
        { imgSrc: "/images/food2.png", tag: "단백질 위주", name: "순두부국", carbsPercent: "50", proteinPercent: "30", fatPercent: "20" },
        { imgSrc: "/images/food1.png", tag: "균형잡힌", name: "두부조림", carbsPercent: "50", proteinPercent: "30", fatPercent: "20" },
    ];

    return (
        <>
        <div className='Wrapper-menu-recom'>
            <div className='review-name'>이 음식 어때요?</div>
            <div className='rv1' style={{ fontWeight: 500 }}>영양 보고서와 건강정보를 바탕으로</div>
            <div className='rv2'>
                <span>오늘 딱 맞는 음식</span>
                <div className='rv1' style={{ fontWeight: 500 }}>을 추천드려요.</div>
            </div>

            <div className='menu-recom-scroll'>
                {menuRecomList.map((menu, idx) => (
                    <MenuRecomCard
                        key={idx}
                        {...menu}
                        isSelected={selectedIdx === idx}
                        onClick={() => setSelectedIdx(idx)}
                    />
                ))}
            </div>

            <div className='button'>
                <button className='return' onClick={() => navigate(-1)}>
                    <div className='returntext'>돌아가기</div>
                </button>
                <button
                    className='choose'
                    onClick={() => navigate("/menu/search/result")}
                    disabled={selectedIdx === null}
                >
                    <div className='choosetext'>선택완료</div>
                </button>
            </div>
        </div>
        </>
    );
}

function MenuRecomCard({ imgSrc, tag, name, carbsPercent, proteinPercent, fatPercent, isSelected, onClick }) {
    return (
        <div 
            className={`menu-recom-card ${isSelected ? "selected" : ""}`} 
            onClick={onClick}
            style={{ backgroundColor: isSelected ? "#FFF" : "" }}
        >
            <div className="menu-pic">
                <img src={imgSrc} alt={name} />
                {isSelected && <div className="overlay">선택됨</div>}
            </div>
            <div className='menu-detail'>
                <div className={`menu-tag tag-${tag.replace(/\s+/g, "")}`}>{tag}</div>
                <div className='menu-nick' style={{ color: isSelected ? "#252525" : "#FFF" }}>{name}</div>

                <div className="macro-bar">
                    <div className="carbs" style={{ width: `${carbsPercent}%` }} />
                    <div className="protein" style={{ width: `${proteinPercent}%` }} />
                    <div className="fat" style={{ width: `${fatPercent}%` }} />
                </div>

                <div className='menu-carbohydrate'>
                    <img src="/icons/bluecircle.svg" width={10} alt="carbs"/>
                    <div className='menu-detail-text' style={{ color: isSelected ? "#252525" : "#FFF" }}>탄수화물</div>
                    <div className='menu-detail-percent'>{carbsPercent}%</div>
                </div>
                <div className='menu-protein'>
                    <img src="/icons/orangecircle.svg" width={10} alt="protein"/>
                    <div className='menu-detail-text' style={{ color: isSelected ? "#252525" : "#FFF" }}>단백질</div>
                    <div className='menu-detail-percent'>{proteinPercent}%</div>
                </div>
                <div className='menu-fat'>
                    <img src="/icons/yellowcircle.svg" width={10} alt="fat"/>
                    <div className='menu-detail-text' style={{ color: isSelected ? "#252525" : "#FFF" }}>지방</div>
                    <div className='menu-detail-percent'>{fatPercent}%</div>
                </div>
            </div>
        </div>
    );
}