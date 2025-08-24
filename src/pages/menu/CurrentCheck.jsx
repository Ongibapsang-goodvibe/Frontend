import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import "../../assets/styles/SearchResult.css";
import "../../assets/styles/CurrentOrder.css";
import api from '../../api';

export default function CurrentCheck() {
    const navigate = useNavigate();
    const location = useLocation();
    const { menu } = location.state || {};
    console.log("넘겨받은 주문:", menu);

    if (!menu) {
        return <div>선택된 메뉴가 없습니다.</div>;
    }
    
    return (
        <>
        <div className='Wrapper-current'>
            <div className='result-name'>같은 걸로</div>
            <div className='current-name1'>
                <span>또 주문</span>
                <div className='current-name2'>할까요?</div>
            </div>

            <div className='current-confirm-box'>
                <div className='menu-current-nick' style={{ color: "#252525" }}>{menu.name}</div>
                <div className='menu-price'  style={{ color: "#252525", fontSize: 32, fontWeight: 600 }}>{menu.price ? `${menu.price.toLocaleString()}원` : "가격 정보 없음"}</div>
                <div className='current-restaurant' style={{ color: "#252525", fontSize: 20, fontWeight: 600, textAlign: "center" }}>{menu.restaurant}</div>

                <div className='current-confirm-img'>
                    <img src={menu.imgSrc || '/images/food1.png'} alt={menu.name}></img>
                </div>

                <div className='menu-delivery-card' style={{ backgroundColor: "#424242", height: 47 }}>
                    <div className='menu-fee'>
                        <div className='menu-fee-text1' style={{ color: "#fff" }}>배달비</div>
                        <div className='menu-fee-text2'>{menu.deliveryFee ? `${menu.deliveryFee.toLocaleString()}원` : "정보 없음"}</div>
                    </div>
                    <div className='menu-bar' style={{ backgroundColor: "#fff" }}></div>
                    <div className='menu-delivery'>
                        <div className='menu-delivery-text1' style={{ color: "#fff" }}>배달시간</div>
                        <div className='menu-delivery-text2' style={{ color: "#fff" }}>{menu.deliveryTime ? `${menu.deliveryTime.toLocaleString()}분` : "정보 없음"}</div>
                    </div>
                </div>
            </div>

            <div className='button'>
                <button className='return' onClick={() => navigate(-1)}>
                    <div className='returntext'>돌아가기</div>
                </button>
                <button
                    className='choose'
                    onClick={() => {
                        console.log("CurrentCheck에서 Payment로 넘길 menu:", menu);
                        navigate("/order/payment", { state: { menu } });
                    }}
                >
                    <div className='choosetext'>네</div>
                </button>
            </div>

        </div>
        </>
    );
}