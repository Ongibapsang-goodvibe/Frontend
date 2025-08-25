import "../../assets/styles/OrderCompleted.css";

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormatDeliveryTime from '../../components/FormatDeliveryTime';

export default function OrderCompleted() {
    const navigate = useNavigate();
    const location = useLocation();
    const menuData = location.state?.menu || {};

    const { order, totalPayment, deliveryTime, menu } = location.state || {};

    console.log("OrderCompleted로 넘어온 deliveryTime:", deliveryTime);
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home", { state: { from: "wait", deliveryTime: deliveryTime || 30 } });
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

const now = new Date();
const estimatedArrival = new Date(now.getTime() + deliveryTime * 1000);

const arrivalHours = estimatedArrival.getHours();
const arrivalMinutes = estimatedArrival.getMinutes().toString().padStart(2, '0');
const arrivalSeconds = estimatedArrival.getSeconds().toString().padStart(2, '0');

const arrivalTimeStr = `${arrivalHours}시 ${arrivalMinutes}분 ${arrivalSeconds}초`;

    console.log(arrivalTimeStr);

    return (
        <>
        <div className='Wrapper'>
            <div className='och'>주문완료</div>
            <div className='t1'>약 {FormatDeliveryTime(deliveryTime)} 뒤</div>
            <div className='t2'>도착 예정</div>
            <div className='time'>
                <div className='t3'>도착예정시간 : </div>
                <div className='t3'>{arrivalTimeStr}</div>
            </div>
            <div className='bobby-order-com'>
                <img src="/images/order-completed.png"></img>
            </div>
        </div>
        </>
    );
}