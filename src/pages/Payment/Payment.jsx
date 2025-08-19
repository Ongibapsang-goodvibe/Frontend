import "../../assets/styles/payment.css";
import UP from "../../../public/up.svg";
import DOWN from "../../../public/down.svg";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Payment() {

    const navigate = useNavigate();
    const [selectedPayment, setSelectedPayment] = useState("cash");
    const [cardNumber, setCardNumber] = useState("");

    return (
        <div className='w'>
        <div className='scroll'>
        <div className="order-container">
            <h2 className="order-title">주문하기</h2>

            <div className='input-pm'>
                <img src='./eat.svg' width={24} ></img>
                <div className='pm3'>사장님</div>
                <div className='pm4'>께 </div>
                <div className='pm3'>따로 부탁</div>
                <div className='pm4'>이 있나요?</div>
            </div>
            <input
                type="text"
                className='input-ph'
                placeholder="있다면 여기를 눌러 글자를 입력하세요."
            />

            <div className='input-pm'>
                <img src='./delivery_dining.svg' width={24} ></img>
                <div className='pm3'>배달 기사</div>
                <div className='pm4'>님께 </div>
                <div className='pm3'>따로 부탁</div>
                <div className='pm4'>이 있나요?</div>
            </div>
        
            <Dropdown options={[
                "도착하면 전화해주세요.",
                "도착하면 문자해주세요.",
                "직접 받을게요.(부재시 문 앞)",
                "문 앞에 놔주세요.(초인종 O)",
                "문 앞에 놔주세요.(초인종 X)"
            ]} />
        </div>

        <div className="payment-section">
            <h3>결제방법</h3>

            <label className="payment-option">
                <input
                    type="radio"
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
                    name="payment"
                    value="card"
                    checked={selectedPayment === "card"}
                    onChange={() => setSelectedPayment("card")}
                />
                만나서 카드결제
            </label>

            <label className="payment-option">
                <input
                    type="radio"
                    name="payment"
                    value="kakao"
                    checked={selectedPayment === "kakao"}
                    onChange={() => setSelectedPayment("kakao")}
                />
                카카오페이 / 토스페이
            </label>

            <label className="payment-option">
                <input
                    type="radio"
                    name="payment"
                    value="alredy"
                    checked={selectedPayment === "alredy"}
                    onChange={() => setSelectedPayment("alredy")}
                />
                미리 결제 (신용/체크카드)
            </label>

            <div className="card-input">
                <input
                    type="text"
                    className='input'
                    placeholder="신용/체크카드"
                    disabled={selectedPayment !== "alredy"}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
                <button className="already" disabled={selectedPayment !== "alredy"}>변경</button>
            </div>
        </div>

        <div className="price-summary">
            <div className="ps">
                <h5>주문 금액</h5>
                <h4>7,900원</h4>
            </div>
            <div className='ps'>
                <h5>+ 배달 금액</h5>
                <h4>1,000원</h4>
            </div>
            <div className='ps'>
                <h5>+ 만원 미만 주문 수수료</h5>
                <h4>500원</h4>
            </div>

            <div className='bar'></div>

            <div className="total">
                <h6>결제금액</h6>
                <h1>9,400원</h1>
            </div>
        </div>

        <div className='pmbt'>
                <button className="pay-button" onClick={() => {navigate("/order-request")}}>9,400원 결제하기</button>
        </div>

    </div>
    </div>
    );
}



function Dropdown({ options }) {
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef} style={{ position: "relative" }}>
            <button 
                className="dropdownb"
                onClick={toggleDropdown}
            >
            {selectedOption
                ? selectedOption
                : isOpen
                ? "여기를 눌러 접으세요."
                : "있다면 여기를 눌러 펼쳐보세요."
            }
            <img
                src={isOpen ? DOWN : UP}
            />
            </button>
            {isOpen && (
                <div 
                    className="dropdown-menu"
                    style={{
                        position: "absolute",
                        zIndex: 1,
                    }}
                >
                {options.map((option, index) => (
                    <div
                        key={index}
                        className="drop-down"
                        onClick={() => handleSelect(option)}
                    >
                {option}
                </div>
                ))}
                </div>
            )}
        </div>
    );
}