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
    const searchQuery = params.get("q");
    const recommendedMenu = location.state?.menu?.menu_name;

    const [menuList, setMenuList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIdx, setSelectedIdx] = useState(null);

    useEffect(() => {
        setLoading(true);
        console.log("추천 메뉴로 넘어온 값:", location.state?.menu);

        if(category) {
            console.log("카테고리 검색:", category);
            api.get(`/api/restaurants/menus/?category=${String(category)}`)

            .then(res => {
                console.log("응답 데이터:", res.data);
                setMenuList(res.data.cards || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('메뉴 리스트 로드 실패:', err);
                setLoading(false);
            });
        }
        else if (recommendedMenu) {
            // 추천 메뉴 POST
            api.post("/api/restaurants/search/", { text: recommendedMenu, limit: 10 })
                .then(res => {
                    console.log("서버 응답:", res.data);
                    const restaurants = res.data.stage === "menu" ? res.data.cards || [] : [];
                    setMenuList(restaurants);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('추천 메뉴 로드 실패:', err);
                    setLoading(false);
                });
        }
        else {
            // 일반 검색(GET) - searchQuery 존재 시
            api.post("/api/restaurants/search/", { text: searchQuery || "", limit: 10 })
                .then(res => {
                    const menus = res.data.stage === "menu" ? res.data.cards || [] : [];
                    setMenuList(menus);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('검색 메뉴 로드 실패:', err);
                    setLoading(false);
                });
        }
    }, [category, searchQuery, recommendedMenu]);

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
                    <div className='menu-delivery-text2' style={{ color: isSelected ? "#fff" : "#252525" }}>{menu.delivery_time ? menu.delivery_time + "분" : "30분"}</div>
                </div>
            </div>
        </div>
    );
}