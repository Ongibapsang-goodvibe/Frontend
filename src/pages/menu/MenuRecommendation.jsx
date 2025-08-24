import "../../assets/styles/Review.css";
import "../../assets/styles/SearchResult.css";

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../../api';

export default function MenuRecommentadion() {
    const navigate = useNavigate();

    const [menuRecomList, setMenuRecomList] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get("/api/orders/recommend/")
            .then(res => {
                setMenuRecomList(res.data.recommended);
                setLoading(false);
            })
            .catch(err => {
                console.error("추천 메뉴 로드 실패:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>로딩 중...</div>;
    if (!menuRecomList.length) return <div>추천 메뉴가 없습니다.</div>;

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
                        key={menu.menu_id}
                        menu={menu}
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
                    onClick={() => navigate("/menu/search/result", { state: { menu: menuRecomList[selectedIdx] } })}
                    disabled={selectedIdx === null}
                >
                    <div className='choosetext'>선택완료</div>
                </button>
            </div>
        </div>
        </>
    );
}

function getMacroTag(macro) {
    const { CARB, PROTEIN, FAT } = macro;
    if (!CARB && !PROTEIN && !FAT) return "균형잡힌"; // 값 없는 경우

    if (Math.max(CARB, PROTEIN, FAT) - Math.min(CARB, PROTEIN, FAT) <= 20) return "균형잡힌";
    if (FAT >= PROTEIN && FAT >= CARB) return "지방 위주 식사";
    if (PROTEIN >= FAT && PROTEIN >= CARB) return "단백질 위주";
    return "균형잡힌";
}

function MenuRecomCard({ menu, isSelected, onClick }) {
    const tag = getMacroTag(menu.macro_percent || { CARB: 0, PROTEIN: 0, FAT: 0 });
    const carbsPercent = menu.macro_percent?.CARB || 0;
    const proteinPercent = menu.macro_percent?.PROTEIN || 0;
    const fatPercent = menu.macro_percent?.FAT || 0;

    return (
        <div 
            className={`menu-recom-card ${isSelected ? "selected" : ""}`} 
            onClick={onClick}
            style={{ backgroundColor: isSelected ? "#FFF" : "" }}
        >
            <div className="menu-pic">
                <img src={menu.image_url || "/images/food1.png"} alt={menu.menu_name} />
                {isSelected && <div className="overlay">선택됨</div>}
            </div>
            <div className='menu-detail'>
                <div className={`menu-tag tag-${tag.replace(/\s+/g, "")}`}>{tag}</div>
                <div className='menu-nick' style={{ color: isSelected ? "#252525" : "#FFF" }}>{menu.menu_name}</div>

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