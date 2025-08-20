import "../../assets/styles/OrderRequest.css";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function OrderRequest() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const timerRef = useRef(null);

    const startTimer = () => {
        timerRef.current = setTimeout(() => {
            navigate("/order-completed");
        }, 5000);
    };

    useEffect(() => {
        startTimer();

        return () => clearTimeout(timerRef.current);
    }, [navigate]);

    const handleOpenModal = () => {
        clearTimeout(timerRef.current);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        startTimer();
    };

    return (
        <>
        <div className='Wrapper-orange'>
            <div className='h1'>매장에서 주문을</div>
            <div className='h2'>
                <div className='h3'>확인</div>
                <div className='h4'>하고 있어요.</div>
            </div>

            <div className='c1'>접수된 후에는</div>
            <div className='c'>
                <div className='c2'>주문을</div>
                <div className='c3'>취소할 수 없어요.</div>
            </div>

            <div className='favicon'>
                <img src="/order-request.svg"></img>
            </div>

            <button className='cancel' onClick={handleOpenModal}>
                <div className='cctext'>주문 취소</div>
            </button>

            {isOpen && (
                <div className='modal-overlay' onClick={handleCloseModal}>
                    <div className='ccmodal' onClick={(e) => e.stopPropagation()}>
                        <div className='emo'>😭</div>
                        <div className='confirmtext1'>진짜로 취소하시겠어요?</div>
                        <div className='confirmtext2'>취소 후에는 되돌릴 수 없어요.</div>
                        <div className='orbt'>
                            <button className='no' onClick={handleCloseModal}>
                                <div className='nobt'>아니요</div>
                            </button>
                            <button className='yes' onClick={() => {navigate("/order-cancel")}}>
                                <div className='yesbt'>네</div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}