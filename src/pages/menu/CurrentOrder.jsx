import "../../assets/styles/SearchResult.css";
import "../../assets/styles/CurrentOrder.css";

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from "../../api";

export default function CurrentOrder() {

    console.log("토큰 확인:", localStorage.getItem("token"));
    const navigate = useNavigate();
    const [currentList, setCurrentList] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        api.get(`api/orders/list/`)
            .then((res) => {
                console.log("백엔드 전체 응답:", res);
                
                const data = res.data;

                // 데이터가 배열인지 확인
                if (!data || typeof data !== "object") {
                    console.error("백엔드 데이터가 배열/객체가 아님:", data);
                    return;
                }

                const arr = Array.isArray(data) ? data : [data];
                console.log("처리할 배열:", arr);
                
                const formatted = arr.map((order) => {
                    const date = new Date(order.time);
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    const week = ["일", "월", "화", "수", "목", "금", "토"];
                    const weekday = week[date.getDay()];

                    return {
                        menu_id: order.id,
                        imgSrc: order.image_url || "/images/food1.png",
                        date: `${month}월 ${day}일 (${weekday})`,
                        name: order.menu_name,
                        restaurant: order.restaurant_name,

                        price: order.price,
                        deliveryFee: order.delivery_fee,
                        deliveryTime: order.delivery_time,
                    };
                });

                setCurrentList(formatted);
            })
            .catch((err) => {
                console.error("백엔드 요청 에러:", err);
                if (err.response?.status === 401) {
                    alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
                    navigate("/login");
                }
            });
    }, []);

    const handleClick = (idx) => {
        setSelectedIdx(idx);
        const selectedMenu = currentList[idx];
        navigate("/menu/current-order/check", { state: { menu: selectedMenu } });
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
        <div className={`menu-container ${isSelected ? "selected" : ""}`} onClick={onClick}>
            <div className='menu-card'>
                <div className='menu-pic'>
                    <img src={imgSrc} width={101} height={133} alt={name} />
                </div>
                <div className='menu-review-detail'>
                    <div className='current-date' style={{ color: isSelected ? "#252525" : "#FFF" }}>{date}</div>
                    <div className='menu-review-nick' style={{ color: isSelected ? "#252525" : "#FFF" }}>{name}</div>
                    <div className='current-restaurant' style={{ color: isSelected ? "#252525" : "#FFF" }}>{restaurant}</div>
                </div>
            </div>
        </div>
    );
}