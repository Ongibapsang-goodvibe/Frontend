import "../../assets/styles/Nutrition.css";

export default function Nutrition() {
    return (
        <div className='Wrapper-black'>
            <div className='bg top'></div>
            <div className='bg bottom'></div>
            <div className='nutrition-container'>
                <div className='nutrition-date'>8월 4일 - 8월 10일</div>
                <div className='nu-con1'>
                    <div className='nutrition-id'>김영철</div>
                    <div className='nutrition-id1'>님의 영양 보고서</div>
                    <img src='/nutrition.png' width={65}></img>
                </div>

                <div className='nu-con2'>
                    <div className='nu-text1'>이번 주는 탄수화물 위주의<br />식사를 하셨네요.</div>
                </div>

                <div className='nu-analysis'>질환 맞춤 분석</div>

                <NutritionCard />
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
            <div className='nutrition-warn'>⚠️ 탄수화물 섭취가 많으면 혈당관리가 어려워요.<br />고기, 튀김 같은 기름진 음식을 줄이고, 삶거나 찐<br />요리를 드셔보세요!</div>
            <div className='nutrition-good'>✓ 나머지는 다 잘하고 계세요.</div>
        </div>
        </>
    );
}