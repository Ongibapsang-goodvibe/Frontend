import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import "../../assets/styles/SearchResult.css";
import "../../assets/styles/CurrentOrder.css";

export default function CurrentConfirm() {
    const navigate = useNavigate();

    return (
        <>
        <div className='Wrapper-current'>
            <div className='result-name'>같은 걸로</div>
            <div className='current-name1'>
                <span>또 주문</span>
                <div className='current-name2'>할까요?</div>
            </div>

            <div className='current-confirm-box'>
                <div className='menu-current-nick' style={{ color: "#252525" }}>순두부국</div>
                <div className='menu-price'  style={{ color: "#252525", fontSize: 32, fontWeight: 600 }}>7,900원</div>
                <div className='current-restaurant' style={{ color: "#252525", fontSize: 20, fontWeight: 600 }}>맛나식당</div>

                <div className='current-confirm-img'>
                    <img src='/food1.svg'></img>
                </div>

                <div className='menu-delivery-card' style={{ backgroundColor: "#424242", height: 47 }}>
                    <div className='menu-fee'>
                        <div className='menu-fee-text1' style={{ color: "#fff" }}>배달비</div>
                        <div className='menu-fee-text2'>1,000원</div>
                    </div>
                    <div className='menu-bar' style={{ backgroundColor: "#fff" }}></div>
                    <div className='menu-delivery'>
                        <div className='menu-delivery-text1' style={{ color: "#fff" }}>배달시간</div>
                        <div className='menu-delivery-text2' style={{ color: "#fff" }}>15분 ~ 20분</div>
                    </div>
                </div>
            </div>

            <div className='button'>
                <button className='return' onClick={() => navigate(-1)}>
                    <div className='returntext'>돌아가기</div>
                </button>
                <button
                    className='choose'
                    onClick={() => navigate("/payment")}
                >
                    <div className='choosetext'>네</div>
                </button>
            </div>

        </div>
        </>
    );
}