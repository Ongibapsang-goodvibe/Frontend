import "../../assets/styles/OrderCancel.css";

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderCancel() {
    const navigate = useNavigate();

    useEffect(() => {
            const timer = setTimeout(() => {
                navigate("/home");
            }, 5000);
    
            return () => clearTimeout(timer);
        }, [navigate]);

    return (
        <>
        <div className='Wrap'>
            <div className='octext'>
                <div className='octext1'>주문이</div>
                <div className='octext2'>
                    <div className='octext1'>취소</div>
                    <div className='octext1'>되었어요</div>
                </div>
            </div>
            <div className='octext5'>다음에 다시 만나요.</div>
            <div className='bobby-oc'>
                <img src="/order-cancel.svg"></img>
            </div>
        </div>
        </>
    );
}