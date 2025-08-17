import "../../assets/styles/OrderRequest.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderRequest() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
        <div className='Wrapper'>
            <div className='h1'>매장에서 주문을</div>
            <div className='h2'>확인하고 있어요.</div>

            <div className='c1'>접수된 후에는</div>
            <div className='c'>
                <div className='c2'>주문을</div>
                <div className='c3'>취소할 수 없어요.</div>
            </div>

            <div className='favicon'>
                <img src="/favicon.svg"></img>
            </div>

            <button className='cancel' onClick={() => setIsOpen(true)}>
                <div className='cctext'>주문 취소</div>
            </button>

            {isOpen && (
                <div className='modal-overlay' onClick={() => setIsOpen(false)}>
                    <div className='ccmodal' onClick={(e) => e.stopPropagation()}>
                        <div className='emo'>😭</div>
                        <div className='confirmtext1'>진짜로 취소하시겠어요?</div>
                        <div className='confirmtext2'>취소 후에는 되돌릴 수 없어요.</div>
                        <div className='orbt'>
                            <button className='no' onClick={() => setIsOpen(false)}>
                                <div className='nobt'>아니요</div>
                            </button>
                            <button className='yes' onClick={() => {navigate("/ordercancel")}}>
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