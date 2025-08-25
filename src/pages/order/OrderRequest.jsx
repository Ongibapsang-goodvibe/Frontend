import "../../assets/styles/OrderRequest.css";

import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';

import api from '../../api';
import formatDeliveryTime from '../../components/FormatDeliveryTime';

export default function OrderRequest() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuData = location.state?.menu || {};

    const timerRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const { order, totalPayment, deliveryTime } = location.state || {};

    console.log("OrderRequest로 넘어온 deliveryTime:", deliveryTime);
    const startTimer = () => {
        timerRef.current = setTimeout(() => {
            navigate("/order/completed", {
                state: {
                    menu: menuData,
                    totalPayment,
                    deliveryTime: deliveryTime ?? menuData.deliveryTime ?? menuData.delivery_time,
            }
            });
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

    const handleCancelOrder = () => {
    if (!order?.id) return; // order id 없으면 종료
    api.delete(`/api/orders/delete/${order.id}`)
        .then(res => {
            // 성공 시 취소 완료 페이지로 이동
            console.log("주문 취소 완료:", res.data);
            navigate("/order/cancel");
        })
        .catch(err => {
            console.error("주문 취소 실패:", err);
        });
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

            <div className='bobby-order-request'>
                <img src="/images/order-request.png"></img>
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
                            <button className='yes' onClick={handleCancelOrder}>
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