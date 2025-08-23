import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../../assets/styles/Review.css";
import "../../assets/styles/SearchResult.css";
import api from "../../api";

export default function SearchResult() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const category = params.get("category");

    const [menuList, setMenuList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIdx, setSelectedIdx] = useState(null);

    useEffect(() => {
        if(!category) return;
        

        setLoading(true);
        console.log("category 값:", category);
        
        api.get(`/api/restaurants/menus/?initial_label=${String(category)}`)
            .then(res => {
                console.log("응답 데이터:", res.data);
                setMenuList(res.data.cards || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('메뉴 리스트 로드 실패:', err);
                setLoading(false);
            });
    }, [category]);

    if (loading) return <div>로딩 중...</div>;
    if (!menuList.length) return <div>메뉴가 없습니다.</div>;

    return (
        <div className='Wrapper-search-result'>
            <div className='result-name'>주문할 음식을 눌러 <br /> 선택하세요.</div>
            
            <div className='search-result-scroll'>
            <>
                {menuList.map((menu, idx) => (
                    <MenuCard
                        key={menu.menu_id}
                        imgSrc={menu.image_url || "/images/default-menu.png"}
                        name={menu.menu_name}
                        price={menu.price}
                        restaurant={menu.restaurant_name}
                        fee={menu.delivery_fee}
                        deliveryTime="30분"
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
                    onClick={() => navigate("/order/payment", { state: { menu: menuList[selectedIdx] } })}
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