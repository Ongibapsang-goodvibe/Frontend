import "../../assets/styles/Review.css";

import { useNavigate } from 'react-router-dom';

export default function Review({ carbs, protein, fat }) {
    const navigate = useNavigate();

    const total = carbs + protein + fat;

    const carbsPercent = Math.round((carbs / total) * 100);
    const proteinPercent = Math.round((protein / total) * 100);
    const fatPercent = Math.round((fat / total) * 100);

    return (
        <>
        <div className='Wrapper-black'>
        <div className='review-scroll'>
            <div className='review-name' style={{ marginBottom: 20 }}>맛나식당 순두부국</div>

            <MenuCard
                imgSrc="/food1.svg"
                tag="지방 위주 식사"
                name="순두부국"
                carbsPercent={50}
                proteinPercent={30}
                fatPercent={20}
            />

            <div className='review-container3'>
                <div className='rv1'>먹어본 사람들은<br />주로 이렇게 평가했어요.</div>
            </div>
            

            <div className='review-container1'>
                <div className='review-container2'>
                    <div className='review-good'>😊 좋았던 점</div>
                    <div className='review-text'>
                        <div className='review-text1'>좋아하는 음식이에요</div>
                        <div className='review-text2'>15</div>
                    </div>
                    <div className='review-text'>
                        <div className='review-text1'>간이 딱 맞아요</div>
                        <div className='review-text2'>11</div>
                    </div>
                    <div className='review-text'>
                        <div className='review-text1'>속이 편해요</div>
                        <div className='review-text2'>2</div>
                    </div>
                </div>

                <div className='review-bar'></div>

                <div className='review-container2'>
                    <div className='review-bad'>😥 아쉬운 점</div>
                    <div className='review-text'>
                        <div className='review-text1'>느끼해요</div>
                        <div className='review-text2'>13</div>
                    </div>
                    <div className='review-text'>
                        <div className='review-text1'>달아요</div>
                        <div className='review-text2'>9</div>
                    </div>
                    <div className='review-text'>
                        <div className='review-text1'>싱거워요</div>
                        <div className='review-text2'>15</div>
                    </div>
                    <div className='review-text'>
                        <div className='review-text1'>짜요</div>
                        <div className='review-text2'>1</div>
                    </div>
                </div>
            </div>

            <div className='review-detail'>이런 후기를 직접 남겼어요.</div>

            <div className='review-container4'>
                <div className='review-nickname-date'>
                    <div className='review-nickname'>송** 님</div>
                    <div className='review-date'>2025년 8월 13일</div>
                </div>
                <div className='review-comment'>아 너무 맛있어요</div>
            </div>

            <div className='review-container4'>
                <div className='review-nickname-date'>
                    <div className='review-nickname'>송** 님</div>
                    <div className='review-date'>2025년 8월 13일</div>
                </div>
                <div className='review-comment'>아 너무 맛있어요</div>
            </div>

        </div>
            <div className='review-return'>
                <button className='review-return-button' onClick={() => navigate(-1)}>돌아가기</button>
            </div>

        </div>
        </>
    );
}

function MenuCard({ imgSrc, tag, name, carbsPercent, proteinPercent, fatPercent }) {
    return (
        <div className='menu-recom-card' style={{ backgroundColor: "#fff" }}>
            <div className="menu-pic">
                <img src={imgSrc} alt={name} />
            </div>
            <div className='menu-detail'>
                <div className='menu-tag'>{tag}</div>
                <div className='menu-nick'>{name}</div>

                <div className="macro-bar">
                    <div className="carbs" style={{ width: `${carbsPercent}%` }} />
                    <div className="protein" style={{ width: `${proteinPercent}%` }} />
                    <div className="fat" style={{ width: `${fatPercent}%` }} />
                </div>

                <div className='menu-carbohydrate'>
                    <img src="/bluecircle.svg" width={10} alt="carbs"/>
                    <div className='menu-detail-text'>탄수화물</div>
                    <div className='menu-detail-percent'>{carbsPercent}%</div>
                </div>
                <div className='menu-protein'>
                    <img src="/orangecircle.svg" width={10} alt="protein"/>
                    <div className='menu-detail-text'>단백질</div>
                    <div className='menu-detail-percent'>{proteinPercent}%</div>
                </div>
                <div className='menu-fat'>
                    <img src="/yellowcircle.svg" width={10} alt="fat"/>
                    <div className='menu-detail-text'>지방</div>
                    <div className='menu-detail-percent'>{fatPercent}%</div>
                </div>
            </div>
        </div>
    );
}
