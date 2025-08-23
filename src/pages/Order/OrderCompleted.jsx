import "../../assets/styles/OrderCompleted.css";

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OrderCompleted() {
    const navigate = useNavigate();
    const location = useLocation();

    const { order, totalPayment, deliveryTime } = location.state || {};
    
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home", { state: { from: "wait", deliveryTime: deliveryTime || 30 } });
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <>
        <div className='Wrapper'>
            <div className='och'>주문완료</div>
            <div className='t1'>약 {deliveryTime}분 뒤</div>
            <div className='t2'>도착 예정</div>
            <div className='time'>
                <div className='t3'>도착예정시간 : </div>
                <div className='t3'>12시 30분</div>
            </div>
            <div className='bobby-order-com'>
                <img src="/images/order-completed.png"></img>
            </div>
        </div>
        </>
    );
}