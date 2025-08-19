import "../../assets/styles/Case1.css";

export default function Case1() {
    return (
    <>
    <div className='Wrapper'>
        <div className='qs1'>주문할 음식을 눌러</div>
        <div className='qs2'>선택하세요.</div>

        <div className='container'>
            <div className='menucontainer'>
                <div className='m1'>
                    <img src="/food.svg" width={101} height={133} ></img>
                </div>
                <div className='m2'>
                    <div className='name'>순두부국</div>
                    <div className='line2'>
                        <div className='price'>7,900원</div>
                        <button className='review'>
                            <div className='reviewtext'>후기보기</div>
                        </button>
                    </div>
                    <div className='rt'>맛나식당</div>
                </div>
            </div>
            <div className='deliverycontainer'>
                <div className='d1'>
                    <div className='fee'>배달비</div>
                    <div className='won'>1,000원</div>
                </div>
                <div className='var'></div>
                <div className='d2'>
                    <div className='ctime'>배달시간 약</div>
                    <div className='min'>15 ~ 30분</div>
                </div>
            </div>
        </div>

        <div className='button'>
            <button className='return'>
                <div className='returntext'>돌아가기</div>
            </button>
            <button className='choose'>
                <div className='choosetext'>선택완료</div>
            </button>
        </div>
    </div>
    </>
    );
}
