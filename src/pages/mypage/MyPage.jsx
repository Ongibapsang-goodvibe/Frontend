import "../../assets/styles/mypage.css";

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from "../../api";

export default function MyPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: 2,
        disease_id: [1, 2],
    });

    /*
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);
    */

    const handleEditDisease = () => {
        const user_id = 2;
        navigate("/health-status", {
            state: {
                editMode: true,
                id: user_id,
                currentDiseases: user.disease_id
            }
        });
    };

    return (
        <div className='Wrapper-mypage'>
            <div className='mypage-header'>내 정보</div>

            <div className='mypage-container'>
                <div className='mypage-container2'>
                    <div className='mypage-text1'>개인 정보</div>
                    <MyPageButton text="전화번호 변경" />
                    <MyPageButton text="주소 변경" />
                    <MyPageButton text="질환 정보 수정" onClick={handleEditDisease} />
                </div>
            </div>

            <div className='mypage-container'>
                <div className='mypage-container2'>
                    <div className='mypage-text'>보호자 설정</div>
                    <MyPageButton text="보호자 등록/해제" />
                </div>
            </div>

            <div className='mypage-container'>
                <div className='mypage-container2'>
                    <div className='mypage-text'>고객지원</div>
                    <MyPageButton text="이용약관" />
                    <MyPageButton text="로그아웃" />
                    <MyPageButton 
                        text="탈퇴하기"
                        style={{
                            color: "#ffa6a6",
                            borderColor: "#ffa6a6"
                        }}
                    />
                </div>

                <div className='mypage-team'>(주) 온기밥상</div>
            <div className='mypage-contact'>서울특별시 마포구 ㅣ 02 - 1234 - 5678</div>
            </div>

        </div>
    );
}

// 버튼 컴포넌트
function MyPageButton({ text, style, onClick }) {
    return (
        <button className='mypage-btn' style={style} onClick={onClick}>
            <div className='mypage-content' style={style}>{text}</div>
            <img src="/icons/mypage.svg" width={6} alt="icon" />
        </button>
    );
}