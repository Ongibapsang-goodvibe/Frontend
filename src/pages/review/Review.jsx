import "../../assets/styles/Review.css";

import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from "../../api";

export default function Review() {
    const navigate = useNavigate();
    const { menu_id } = useParams();
    console.log("menu_id:", menu_id);
    const location = useLocation();

    const [menuData, setMenuData] = useState(location.state?.menu || null);

    const [goodOptions, setGoodOptions] = useState([]);
    const [badOptions, setBadOptions] = useState([]);
    const [reviewComments, setReviewComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!menuData) {
            async function fetchMenu() {
                try {
                    const res = await api.get(`/api/mealreview/menus/${menu_id}/reviews/`);
                    setMenuData(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            fetchMenu();
        }
    }, [menu_id, menuData]);

    // 옵션 및 리뷰 데이터 fetch
    useEffect(() => {
        async function fetchOptions() {
            try {
                const [goodRes, badRes, reviewRes] = await Promise.all([
                    api.get("/api/mealreview/options/?kind=GOOD"),
                    api.get("/api/mealreview/options/?kind=BAD"),
                    api.get(`/api/mealreview/menus/${menu_id}/reviews/`)
                ]);
                setGoodOptions(goodRes.data);
                setBadOptions(badRes.data);
                setReviewComments(reviewRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchOptions();
    }, [menu_id]);

    if (!menuData) return <div>메뉴 정보가 없습니다.</div>;
    if (loading) return <div>로딩중...</div>;

    return (
        <>
        <div className='Wrapper-review'>
            <div className='review-name' style={{ marginBottom: 20, lineHeight: 1.1 }}>{menuData.restaurant_name} {menuData.menu_name}</div>

        <div className='review-scroll'>
            <MenuCard menuData={menuData} />

            <div className='review-container3'>
                <div className='rv1'>먹어본 사람들은<br />주로 이렇게 평가했어요.</div>
            </div>
            

            <div className='review-container1'>
                <div className='review-container2'>
                    <div className='review-good'>😊 좋았던 점</div>
                    {goodOptions
                        .sort((a, b) => b.sort_order - a.sort_order)
                        .map(opt => (
                            <div className='review-text' key={opt.id}>
                                <div className='review-text1'>{opt.label}</div>
                                <div className='review-text2'>{opt.sort_order}</div>
                            </div>
                        ))
                    }
                </div>

                <div className='review-bar'></div>

                <div className='review-container2'>
                    <div className='review-bad'>😥 아쉬운 점</div>
                    {badOptions
                        .sort((a, b) => b.sort_order - a.sort_order)
                        .map(opt => (
                            <div className='review-text' key={opt.id}>
                                <div className='review-text1'>{opt.label}</div>
                                <div className='review-text2'>{opt.sort_order}</div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='review-detail'>이런 후기를 직접 남겼어요.</div>

            {reviewComments
                .filter(r => !r.option) // 텍스트 리뷰만
                .map(( { id, nick, date, text }, index) => (
                    <ReviewComment
                        key={id || index}
                        nick={nick || "익명"}
                        date={new Date(date).toLocaleDateString()}
                        text={text}
                    />
                ))
            }

        </div>
            <div className='review-return'>
                <button className='review-return-button' onClick={() => navigate(-1)}>돌아가기</button>
            </div>

        </div>
        </>
    );
}

function getMacroTag(macro) {
    const { CARB, PROTEIN, FAT } = macro || {};
    if (!CARB && !PROTEIN && !FAT) return "균형잡힌";

    if (Math.max(CARB, PROTEIN, FAT) - Math.min(CARB, PROTEIN, FAT) <= 20) return "균형잡힌";
    if (FAT >= PROTEIN && FAT >= CARB) return "지방 위주 식사";
    if (PROTEIN >= FAT && PROTEIN >= CARB) return "단백질 위주";
    return "균형잡힌";
}

function MenuCard({ menuData }) {
    const tag = getMacroTag(menuData.macro_percent);
    const carbsPercent = menuData.macro_percent?.CARB || 0;
    const proteinPercent = menuData.macro_percent?.PROTEIN || 0;
    const fatPercent = menuData.macro_percent?.FAT || 0;

    return (
        <div className='menu-recom-card' style={{ backgroundColor: "#fff" }}>
            <div className="menu-pic">
                <img src={menuData.image_url || "/images/food1.png"} alt={menuData.menu_name} />
            </div>
            <div className='menu-detail'>
                <div className='menu-tag'>{tag}</div>
                <div className='menu-nick'>{menuData.menu_name}</div>

                <div className="macro-bar">
                    <div className="carbs" style={{ width: `${carbsPercent}%` }} />
                    <div className="protein" style={{ width: `${proteinPercent}%` }} />
                    <div className="fat" style={{ width: `${fatPercent}%` }} />
                </div>

                <div className='menu-carbohydrate'>
                    <img src="/icons/bluecircle.svg" width={10} alt="carbs"/>
                    <div className='menu-detail-text'>탄수화물</div>
                    <div className='menu-detail-percent'>{carbsPercent}%</div>
                </div>
                <div className='menu-protein'>
                    <img src="/icons/orangecircle.svg" width={10} alt="protein"/>
                    <div className='menu-detail-text'>단백질</div>
                    <div className='menu-detail-percent'>{proteinPercent}%</div>
                </div>
                <div className='menu-fat'>
                    <img src="/icons/yellowcircle.svg" width={10} alt="fat"/>
                    <div className='menu-detail-text'>지방</div>
                    <div className='menu-detail-percent'>{fatPercent}%</div>
                </div>
            </div>
        </div>
    );
}

function ReviewComment({ nick, date, text }) {
    return (
        <>
        <div className='review-container4'>
            <div className='review-nickname-date'>
                <div className='review-nickname'>{nick}</div>
                <div className='review-date'>{date}</div>
            </div>
            <div className='review-comment'>{text}</div>
        </div>
        </>
    );
}