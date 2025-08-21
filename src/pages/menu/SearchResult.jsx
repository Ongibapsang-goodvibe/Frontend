import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import "../../assets/styles/Review.css";
import "../../assets/styles/SearchResult.css";

export default function SearchResult() {
    const navigate = useNavigate();

    const [selectedIdx, setSelectedIdx] = useState(null);

    const menuList = [
        { imgSrc: "/images/food1.png", name: "콩나물 순두부국", price: "7,900원", restaurant: "맛나식당", fee: "1,000원", deliveryTime: "15분 ~ 30분" },
        { imgSrc: "/images/food2.png", name: "순두부국", price: "7,900원", restaurant: "맛나식당", fee: "1,000원", deliveryTime: "15분 ~ 30분" },
        { imgSrc: "/images/food1.png", name: "두부조림", price: "43,000원", restaurant: "맛나식당", fee: "6,000원", deliveryTime: "20분 ~ 40분" },
        { imgSrc: "/images/food1.png", name: "두부조림", price: "43,000원", restaurant: "맛나식당", fee: "6,000원", deliveryTime: "20분 ~ 40분" },
    ];

    return (
        <div className='Wrapper-search-result'>
            <div className='result-name'>주문할 음식을 눌러 <br /> 선택하세요.</div>
            
            <div className='search-result-scroll'>
            <>
                {menuList.map((menu, idx) => (
                    <MenuCard
                        key={idx}
                        {...menu}
                        isSelected={selectedIdx === idx}
                        onClick={() => setSelectedIdx(idx)}
                    />
                ))}
            </>
            </div>

            <div className='button'>
                <button className='return' onClick={() => navigate(-1)}>
                    <div className='returntext'>돌아가기</div>
                </button>
                <button
                    className='choose'
                    onClick={() => navigate("/order/payment")}
                    disabled={selectedIdx === null}
                >
                    <div className='choosetext'>선택완료</div>
                </button>
            </div>

        </div>
    );
}

function MenuCard({ imgSrc, name, price, restaurant, fee, deliveryTime, isSelected, onClick }) {
    const navigate = useNavigate();

    return (
        <div className={`menu-container ${isSelected ? "selected" : ""}`} onClick={onClick}>
            <div className='menu-card'>
                <div className='menu-pic'>
                    <img src={imgSrc} alt={name} width={101} height={133}></img>
                    {isSelected && <div className="overlay">선택됨</div>}
                </div>
                <div className='menu-review-detail'>
                    <div className='menu-review-nick' style={{ color: isSelected ? "#252525" : "#FFF" }}>{name}</div>
                    <div className='menu-nick-price'>
                        <div className='menu-price'  style={{ color: isSelected ? "#252525" : "#FFF" }}>{price}</div>
                        <button className='menu-review' onClick={(e) => { e.stopPropagation(); navigate("/menu/review"); }}>후기보기</button>
                    </div>
                    <div className='menu-restaurant'  style={{ color: isSelected ? "#252525" : "#FFF" }}>{restaurant}</div>
                </div>
            </div>
            <div className='menu-delivery-card' style={{ backgroundColor: isSelected ? "#424242" : "#fff" }}>
                <div className='menu-fee'>
                    <div className='menu-fee-text1' style={{ color: isSelected ? "#fff" : "#252525" }}>배달비</div>
                    <div className='menu-fee-text2'>{fee}</div>
                </div>
                <div className='menu-bar' style={{ backgroundColor: isSelected ? "#fff" : "#252525" }}></div>
                <div className='menu-delivery'>
                    <div className='menu-delivery-text1' style={{ color: isSelected ? "#fff" : "#252525" }}>배달시간</div>
                    <div className='menu-delivery-text2' style={{ color: isSelected ? "#fff" : "#252525" }}>{deliveryTime}</div>
                </div>
            </div>
        </div>
    );
}