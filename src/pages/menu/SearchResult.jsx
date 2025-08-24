import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../../assets/styles/Review.css";
import "../../assets/styles/SearchResult.css";
import api from "../../api";
import formatDeliveryTime from '../../components/FormatDeliveryTime';

export default function SearchResult() {
    const navigate = useNavigate();
    const location = useLocation();

    const { results = [], q = "", stage = "menu" } = location.state || {};

    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    const searchQuery = params.get("q");
    const recommendedMenu = location.state?.menu?.menu_name;

    const [menuList, setMenuList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIdx, setSelectedIdx] = useState(null);

    useEffect(() => {
        if (results && results.length > 0) {
            // MenuText
            setMenuList(results);
            setLoading(false);
        } else if (category) {
            // 카테고리 GET
            api.get(`/api/restaurants/menus/?category=${category}`)
            .then(res => {
                setMenuList(res.data.cards || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setMenuList([]);
                setLoading(false);
            });
        } else if (recommendedMenu?.trim()) {
            // 추천 메뉴 POST
            api.post("/api/restaurants/search/", { text: recommendedMenu, limit: 10 })
            .then(res => {
                setMenuList(res.data.stage === "menu" ? res.data.cards || [] : []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setMenuList([]);
                setLoading(false);
            });
        } else if (searchQuery?.trim()) {
            // 검색어 POST
            api.post("/api/restaurants/search/", { text: searchQuery, limit: 10 })
            .then(res => {
                setMenuList(res.data.stage === "menu" ? res.data.cards || [] : []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setMenuList([]);
                setLoading(false);
            });
        } else {
            setMenuList([]);
            setLoading(false);
        }
    }, [results, category, recommendedMenu, searchQuery]);

    if (loading) return <div>로딩 중...</div>;
    if (!menuList.length) return <div>메뉴가 없습니다.</div>;

    return (
        <div className='Wrapper-search-result'>
            <div className='result-name'>주문할 음식을 눌러 <br /> 선택하세요.</div>
            
            <div className='search-result-scroll'>
            <>
                {menuList.map((menu, idx) => (
                    <MenuCard
                        key={menu.menu_id + "_" + menu.restaurant_id}
                        menu={menu}
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

function MenuCard({ menu, isSelected, onClick }) {
    const navigate = useNavigate();

    return (
        <div className={`menu-container ${isSelected ? "selected" : ""}`} onClick={onClick}>
            <div className='menu-card'>
                <div className='menu-pic'>
                    <img src={menu.image_url || "/images/food1.png"} alt={menu.menu_name} width={101} height={133}></img>
                    {isSelected && <div className="overlay">선택됨</div>}
                </div>
                <div className='menu-review-detail'>
                    <div className='menu-review-nick' style={{ color: isSelected ? "#252525" : "#FFF" }}>{menu.menu_name}</div>
                    <div className='menu-nick-price'>
                        <div className='menu-price'  style={{ color: isSelected ? "#252525" : "#FFF" }}>{menu.price}원</div>
                        <button className='menu-review' onClick={(e) => { e.stopPropagation(); navigate(`/menu/review/${menu.menu_id}`, { state: { menu } }); }}>후기보기</button>
                    </div>
                    <div className='menu-restaurant'  style={{ color: isSelected ? "#252525" : "#FFF" }}>{menu.restaurant_name}</div>
                </div>
            </div>
            <div className='menu-delivery-card' style={{ backgroundColor: isSelected ? "#424242" : "#fff" }}>
                <div className='menu-fee'>
                    <div className='menu-fee-text1' style={{ color: isSelected ? "#fff" : "#252525" }}>배달비</div>
                    <div className='menu-fee-text2'>{menu.delivery_fee}원</div>
                </div>
                <div className='menu-bar' style={{ backgroundColor: isSelected ? "#fff" : "#252525" }}></div>
                <div className='menu-delivery'>
                    <div className='menu-delivery-text1' style={{ color: isSelected ? "#fff" : "#252525" }}>배달시간</div>
                    <div className='menu-delivery-text2' style={{ color: isSelected ? "#fff" : "#252525" }}>{menu.delivery_time
    ? formatDeliveryTime(menu.delivery_time)
    : "약 30분 뒤"
}</div>
                </div>
            </div>
        </div>
    );
}