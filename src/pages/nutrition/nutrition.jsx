import "../../assets/styles/Nutrition.css";

export default function Nutrition() {
    return (
        <div className='Wrapper-nutrition'>
            <div className='bg top'></div>

            <div className='bg-card-wrapper'>
                <div className='nu-analysis'>질환 맞춤 분석</div>

                <div className='nutrition-card-list'>
                    <NutritionCard />
                    <NutritionCard />
                </div>

                <div className='nu-text3'>*실제 영양상태와의 차이가 있을 수 있습니다.</div>
                <div className='nu-text4'>주문 음식을 질환별 권장 영양소 기준으로 분석</div>
            </div>

            <div className='nutrition-container'>
                <div className='nutrition-date'>8월 4일 - 8월 10일</div>
                <div className='nu-con1'>
                    <div className='nutrition-id'>김영철</div>
                    <div className='nutrition-id1'>님의 영양 보고서</div>
                    <img src='/nutrition.png' width={65}></img>
                </div>

                <div className='nu-con2'>
                    <div className='nu-text'>
                        <div className='nu-text1'>이번 주는</div>
                        <div className='nu-text2' style={{ fontWeight: 700 }}>탄수화물</div>
                        <div className='nu-text1'>위주의</div>
                    </div>
                    <div className='nu-text1'>식사를 하셨네요.</div>
                    
                    <div className="nu-macro-bar">
                        <div className="nu-carbs" style={{ width: "60%" }} />
                        <div className="nu-protein" style={{ width: "20%" }} />
                        <div className="nu-fat" style={{ width: "20%" }} />
                    </div>
                    <div className='nu-macro'>
                        <div className='nu-menu-carbohydrate'>
                            <img src="/bluecircle.svg" width={16} alt="carbs"/>
                            <div className='nu-menu-detail-text'>탄수화물</div>
                        </div>
                        <div className='nu-menu-protein'>
                            <img src="/orangecircle.svg" width={16} alt="protein"/>
                            <div className='nu-menu-detail-text'>단백질</div>
                        </div>
                        <div className='nu-menu-fat'>
                            <img src="/yellowcircle.svg" width={16} alt="fat"/>
                            <div className='nu-menu-detail-text'>지방</div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    );
}

function NutritionCard() {
    return (
        <>
        <div className='nutrition-card'>
            <div className='nutrition-name'>당뇨</div>
            <div className='nutrition-comment'>탄수화물과 당분 조절이 필요해요.</div>
            <div className='nutrition-warn'>⚠️ 탄수화물 섭취가 많으면 혈당관리가 어려워요. 고기, 튀김 같은 기름진 음식을 줄이고, 삶거나 찐 요리를 드셔보세요!</div>
            <div className='nutrition-good'>✓ 나머지는 다 잘하고 계세요.</div>
        </div>
        </>
    );
}