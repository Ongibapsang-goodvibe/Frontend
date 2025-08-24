import "../../assets/styles/payment.css";
import UP from "../../../public/icons/up.svg";
import DOWN from "../../../public/icons/down.svg";

import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../api';

export default function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const menuData = location.state?.menu || {};

    console.log(menuData);

    const [selectedPayment, setSelectedPayment] = useState("cash");
    const [specialRequest, setSpecialRequest] = useState("");
    const [deliveryOption, setDeliveryOption] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [priceDetail, setPriceDetail] = useState({
        order_amount: menuData.price || 0,
        delivery_fee: menuData.deliveryFee ?? menuData.delivery_fee ?? 0,
        small_order_fee: menuData.price < 10000 ? 500 : 0,
        total: (menuData.price || 0) + (menuData.deliveryFee ?? menuData.delivery_fee ?? 0) + (menuData.price < 10000 ? 500 : 0)
    });
    const dropdownRef = useRef(null);

    const deliveryOptions = [
        "도착하면 전화해주세요.",
        "도착하면 문자해주세요.",
        "직접 받을게요.(부재시 문 앞)",
        "문 앞에 놔주세요.(초인종 O)",
        "문 앞에 놔주세요.(초인종 X)"
    ];

    const deliveryMap = {
        "도착하면 전화해주세요.": "call",
        "도착하면 문자해주세요.": "text",
        "직접 받을게요.(부재시 문 앞)": "in_person",
        "문 앞에 놔주세요.(초인종 O)": "bell",
        "문 앞에 놔주세요.(초인종 X)": "no_bell"
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handlePayment = async () => {
        const menuId = menuData.menu_id;
        const restaurantId = menuData.restaurant_id;
        if (!menuId || !restaurantId) {
            alert("메뉴 또는 식당 정보가 없습니다.");
            return;
        }

        setLoading(true);

        const body = {
            menu_id: menuId,
            restaurant_request: specialRequest || "",
            delivery_request: deliveryMap[deliveryOption] || "call",
            payment_method: selectedPayment
        };

        try {
            const res = await api.post("/api/orders/make/", body);

            const orderId = res.data.id;
            console.log("생성된 orderId:", orderId);

            console.log({ restaurant_id: Number(restaurantId), menu_id: Number(menuId) });
            const outputRes = await api.get("/api/orders/orderoutput/", {
                params: {
                restaurant_id: menuData.restaurant_id,
                menu_id: menuData.menu_id
                }
            });

            const { order_amount, delivery_fee, small_order_fee, total, eta_minutes } = outputRes.data;

            setPriceDetail({ order_amount, delivery_fee, small_order_fee, total });

            navigate("/order/request", {
                state: {
                    orderId,
                    order: res.data,
                    totalPayment: total,
                    deliveryTime: eta_minutes,
                }
            });
        } catch (err) {
            console.error("주문 실패:", err.response?.data || err.message);
            alert("주문에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='Wrapper-payment'>
        <div className='scroll'>
        <div className="order-container">
            <h2 className="order-title">주문하기</h2>

            <div className='input-pm'>
                <img src='/icons/eat.svg' width={24} ></img>
                <div className='pm3'>사장님</div>
                <div className='pm4'>께 </div>
                <div className='pm3'>따로 부탁</div>
                <div className='pm4'>이 있나요?</div>
            </div>
            <input
                type="text"
                className='input-ph'
                placeholder="있다면 여기를 눌러 글자를 입력하세요."
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
            />

            <div className='input-pm'>
                <img src='/icons/delivery_dining.svg' width={24} ></img>
                <div className='pm3'>배달 기사</div>
                <div className='pm4'>님께 </div>
                <div className='pm3'>따로 부탁</div>
                <div className='pm4'>이 있나요?</div>
            </div>
        
            <div className="dropdown" ref={dropdownRef}>
                <button className="dropdownb" onClick={() => setIsDropdownOpen(prev => !prev)}>
                    {deliveryOption || (isDropdownOpen ? "여기를 눌러 접으세요." : "있다면 여기를 눌러 펼쳐보세요.")}
                    <img src={isDropdownOpen ? DOWN : UP} />
                </button>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        {deliveryOptions.map((option, idx) => (
                            <div
                                key={idx}
                                className="drop-down"
                                onClick={() => {
                                    setDeliveryOption(option);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

        <div className="payment-section">
            <h3>결제방법</h3>

            <label className="payment-option">
                <input
                    type="radio"
                    className='payment-option-text'
                    name="payment"
                    value="cash"
                    checked={selectedPayment === "cash"}
                    onChange={() => setSelectedPayment("cash")}
                />
                만나서 현금결제
            </label>

            <label className="payment-option">
                <input
                    type="radio"
                    className='payment-option-text'
                    name="payment"
                    value="card"
                    checked={selectedPayment === "card"}
                    onChange={() => setSelectedPayment("card")}
                />
                만나서 카드결제
            </label>
        </div>

        <div className="price-summary">
            <div className="ps">
                <h5>주문 금액</h5>
                <h4>{priceDetail.order_amount.toLocaleString()}원</h4>
            </div>
            <div className='ps'>
                <h5>+ 배달 금액</h5>
                <h4>{priceDetail.delivery_fee.toLocaleString()}원</h4>
            </div>
            <div className='ps'>
                <h5>+ 만원 미만 주문 수수료</h5>
                <h4>{priceDetail.small_order_fee.toLocaleString()}원</h4>
            </div>

            <div className='bar'></div>

            <div className="total">
                <h6>결제금액</h6>
                <h1>{priceDetail.total.toLocaleString()}원</h1>
            </div>
        </div>

        <div className='pmbt'>
                <button className="pay-button" onClick={handlePayment}>{priceDetail.total.toLocaleString()}원 결제하기</button>
        </div>

    </div>
    </div>
    );
}