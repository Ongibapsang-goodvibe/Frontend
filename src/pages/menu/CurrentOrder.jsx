import "../../assets/styles/SearchResult.css";
import "../../assets/styles/CurrentOrder.css";

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function CurrentOrder() {
    const navigate = useNavigate();
    
    const currentList = [
        { imgSrc: "/food1.svg", date: "8월 17일 (일)", name: "콩나물 순두부국", restaurant: "맛나식당" },
        { imgSrc: "/food2.svg", date: "8월 12일 (화)", name: "순두부국", restaurant: "맛나식당" },
        { imgSrc: "/food1.svg", date: "8월 8일 (금)", name: "두부조림", restaurant: "맛나식당" },
        { imgSrc: "/food1.svg", date: "8월 8일 (금)", name: "두부조림", restaurant: "맛나식당" },
    ];

    const [selectedIdx, setSelectedIdx] = useState(null);

    const handleClick = (idx) => {
        setSelectedIdx(idx);
        setTimeout(() => {
            navigate("/current-confirm");
        }, 2000);
    };

    return (
        <div className='Wrapper-current'>
            <div className='result-name'>최근 주문한 음식</div>
            <div className='current-header'>
                <span>음식을</span>
                <div className='current-text'>누르면 다시 주문</div>
                <span>가능</span>
            </div>

        <div className='current-scroll'>
            {currentList.map((menu, idx) => (
                <CurrentCard
                    key={idx}
                    {...menu}
                    isSelected={selectedIdx === idx}
                    onClick={() => handleClick(idx)}
                />
            ))}
        </div>

        </div>
    );
}

function CurrentCard({ imgSrc, date, name, restaurant, isSelected, onClick }) {

    return (
        <>
        <div className={`menu-container ${isSelected ? "selected" : ""}`} onClick={onClick}>
            <div className='menu-card'>
                <div className='menu-pic'>
                    <img src={imgSrc} width={101} height={133}></img>
                </div>
                <div className='menu-review-detail'>
                    <div className='current-date' style={{ color: isSelected ? "#252525" : "#FFF" }}>{date}</div>
                    <div className='menu-review-nick' style={{ color: isSelected ? "#252525" : "#FFF" }}>{name}</div>
                    <div className='current-restaurant' style={{ color: isSelected ? "#252525" : "#FFF" }}>{restaurant}</div>
                </div>
            </div>
        </div>
        </>
    );
}