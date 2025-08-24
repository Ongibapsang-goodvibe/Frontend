import "../../assets/styles/Nutrition.css";
import { useEffect, useState } from 'react';
import api from "../../api";

const nutrientMap = { CARB: "탄수화물", PROTEIN: "단백질", FAT: "지방" };

export default function Nutrition() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [username, setUsername] = useState();

    useEffect(() => {
        api.get(`/api/accounts/user/`)
            .then(res => {
                console.log("username:", res.data.username);
                setUsername(res.data.username);
            })
            .catch(err => console.error("유저 이름 로드 실패:", err));
    }, []);

    useEffect(() => {
        api.get("/api/healthcare/n_report/currentweek/")
            .then(res => setData(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>로딩중...</div>;
    if (!data) return <div>데이터가 없습니다.</div>;

    const firstDisease = Object.keys(data)[0];
    const diseaseData = data[firstDisease];
    const nutrientPercent = diseaseData.analysis.nutrient_percent;
    const mainNutrient = Object.entries(nutrientPercent).reduce((a, b) => a[1] > b[1] ? a : b)[0];

    return (
        <div className='Wrapper-nutrition'>
            <div className='bg top'></div>

            <div className='bg-card-wrapper'>
                <div className='nu-analysis'>질환 맞춤 분석</div>

                <div className='nutrition-card-list'>
                    {Object.keys(data).map(disease => (
                        <NutritionCard
                            key={disease}
                            disease={disease}
                            aiFeedback1={data[disease].ai_feedback_1}
                            aiFeedback2={data[disease].ai_feedback_2}
                        />
                    ))}
                    
                </div>

                <div className='nu-text3'>*실제 영양상태와의 차이가 있을 수 있습니다.</div>
                <div className='nu-text4'>주문 음식을 질환별 권장 영양소 기준으로 분석</div>
            </div>

            <div className='nutrition-container'>
                <div className='nutrition-date'>
                    {`${new Date(diseaseData.analysis.period_start).getMonth() + 1}월 ${new Date(diseaseData.analysis.period_start).getDate()}일 `} - 
                    {` ${new Date(diseaseData.analysis.period_end).getMonth() + 1}월 ${new Date(diseaseData.analysis.period_end).getDate()}일`}
                </div>
                <div className='nu-con1'>
                    <div className='nutrition-id'>{username}</div>
                    <div className='nutrition-id1'>님의 영양 보고서</div>
                    <img src='/images/nutrition.png' width={65}></img>
                </div>

                <div className='nu-con2'>
                    <div className='nu-text'>
                        <div className='nu-text1'>이번 주는</div>
                        <div className='nu-text2' style={{ fontWeight: 700 }}>{nutrientMap[mainNutrient]}</div>
                        <div className='nu-text1'>위주의</div>
                    </div>
                    <div className='nu-text1'>식사를 하셨네요.</div>
                    
                    <div className="nu-macro-bar">
                        <div className="nu-carbs" style={{ width: `${nutrientPercent.CARB}%` }} />
                        <div className="nu-protein" style={{ width: `${nutrientPercent.PROTEIN}%` }} />
                        <div className="nu-fat" style={{ width: `${nutrientPercent.FAT}%` }} />
                    </div>
                    <div className='nu-macro'>
                        <div className='nu-menu-carbohydrate'>
                            <img src="/icons/bluecircle.svg" width={16} alt="carbs"/>
                            <div className='nu-menu-detail-text'>탄수화물</div>
                        </div>
                        <div className='nu-menu-protein'>
                            <img src="/icons/orangecircle.svg" width={16} alt="protein"/>
                            <div className='nu-menu-detail-text'>단백질</div>
                        </div>
                        <div className='nu-menu-fat'>
                            <img src="/icons/yellowcircle.svg" width={16} alt="fat"/>
                            <div className='nu-menu-detail-text'>지방</div>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        </div>
    );
}

function NutritionCard({ disease, aiFeedback1, aiFeedback2 }) {
    return (
        <>
        <div className='nutrition-card'>
            <div className='nutrition-name'>{disease}</div>
            <div className='nutrition-comment'>{aiFeedback1}</div>
            <div className='nutrition-warn'>⚠️ {aiFeedback2}</div>
            <div className='nutrition-good'>✓ 나머지는 다 잘하고 계세요.</div>
        </div>
        </>
    );
}