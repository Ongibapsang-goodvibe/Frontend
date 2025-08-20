import "../../assets/styles/mypage.css";

import { useNavigate } from 'react-router-dom';

export default function MyPage() {
    const navigate = useNavigate();
    return (
        <div className='Wrapper-mypage'>
            <div className='mypage-header'>내 정보</div>

            <div className='mypage-container'>
                <div className='mypage-container2'>
                    <div className='mypage-text1'>등록 정보</div>
                    <MyPageButton text="전화번호 변경" />
                    <MyPageButton text="주소 변경" />
                    <MyPageButton text="보호자 계정 연결 설정" />
                </div>
            </div>

            <div className='mypage-container'>
                <div className='mypage-container2'>
                    <div className='mypage-text'>질환</div>
                    <MyPageButton text="질환 수정하기" onClick={() => navigate("/health-status")}/>
                </div>
            </div>

            <div className='mypage-container'>
                <div className='mypage-container2'>
                    <div className='mypage-text'>고객지원</div>
                    <MyPageButton text="로그아웃" />
                    <MyPageButton text="이용약관" />
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
            <img src="/mypage.svg" width={6} alt="icon" />
        </button>
    );
}