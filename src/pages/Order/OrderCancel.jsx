import "../../assets/styles/OrderCancel.css";

import { useNavigate } from 'react-router-dom';

export default function OrderCancel() {
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
            <div className='bobby-order-cancel'>
                <img src="/images/order-cancel.png"></img>
            </div>
        </div>
        </>
    );
}