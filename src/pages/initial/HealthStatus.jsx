import '../../assets/styles/HealthStatus.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HealthStatus() {
    const [active, setActive ] = useState([]);
    const navigate = useNavigate();

    const userId = 3;
    
    const handleSubmit = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_BASE}/api/accounts/${userId}/disease/`,
            {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "disease_id": active
            }),
        });

        if (!response.ok) {
            throw new Error('전송 실패');
        }

        navigate("/health-status/result", { state: { selected: active } });

    } catch (error) {
        console.error(error);
        alert('질병 선택 정보를 전송하는데 실패했습니다.');
    }
};
    
    const labels = [
        { id: 1, label: "당뇨" },
        { id: 2, label: "콩팥(신장) 질환" },
        { id: 3, label: "치아 불편" },
        { id: 4, label: "고혈압" },
        { id: 5, label: "위장 질환" },
        { id: 6, label: "관절염" },
        { id: 7, label: "심부전" },
    ];

    const toggleButton = (id) => {
        setActive((prev) =>
            prev.includes(id)
                ? prev.filter((btnId) => btnId !== id)
                : [...prev, id]
        );
    };
    
    return (
        <>
        <div className='Wrapper-health-status'>
            <div className='hsh'>다음 중 해당하는 것을</div>
            <div className='hs'>
                <div className='hsh-orange'>모두</div>
                <div className='hsh1'>선택해주세요.</div>
            </div>
            

            <div className='bt-group'>
                {labels.map((btn) => (
                    <button
                        key={btn.id}
                        onClick={() => toggleButton(btn.id)}
                        className={`bt ${active.includes(btn.id) ? 'active' : ''}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            <div className='hsbutton'>
                <button className='hsreturn' onClick={() => {navigate("/home")}}>
                    <div className='hsreturntext'>건너뛰기</div>
                </button>
                <button className='hschoose' onClick={handleSubmit}>
                    <div className='hschoosetext'>선택완료</div>
                </button>
            </div>
        </div>
        </>
    );
}