import '../../assets/styles/HealthStatus.css';

import { useState } from 'react';

export default function HealthStatus() {
    const [active, setActive ] = useState([]);

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
        <div className='Wrapper'>
            <div className='hslogo'>
                <img src="/TopBarLogo.svg"></img>
            </div>
            <div className='hsh'>다음 중 해당하는 것을</div>
            <div className='hsh1'>모두 선택해주세요.</div>

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
                <button className='hsreturn'>
                    <div className='hsreturntext'>돌아가기</div>
                </button>
                <button className='hschoose'>
                    <div className='hschoosetext'>선택완료</div>
                </button>
            </div>
        </div>
        </>
    );
}