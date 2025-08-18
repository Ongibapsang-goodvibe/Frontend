import "../../assets/styles/Review.css";

export default function Review() {

    return (
        <>
        <div className='Wrapper-black'>
        <div className='review-scroll'>
            <div className='review-name'>맛나식당 순두부국</div>

            <div className='menu-recom-card'>
                <div className="menu-pic">
                    <img src="/food.svg"></img>
                </div>
                <div className='menu-detail'>
                    <div className='menu-tag'>지방 위주 식사</div>
                    <div className='menu-nick'>순두부국</div>
                    <div className='menu-composition'></div>
                    <div className='menu-carbohydrate'>
                        <img src="/bluecircle.svg" width={10}></img>
                        <div className='menu-detail-text'>탄수화물</div>
                        <div className='menu-detail-percent'>13%</div>
                    </div>
                    <div className='menu-protien'>
                        <img src="/orangecircle.svg" width={10}></img>
                        <div className='menu-detail-text'>단백질</div>
                        <div className='menu-detail-percent'>42%</div>
                    </div>
                    <div className='menu-fat'>
                        <img src="/yellowcircle.svg" width={10}></img>
                        <div className='menu-detail-text'>지방</div>
                        <div className='menu-detail-percent'>45%</div>
                    </div>
                </div>
            </div>

            <div className='review-container3'>
                <div className='rv1'>후기에서 많이 언급된</div>
                <div className='rv2'>
                    <div className='rv3'>이 음식의 특징</div>
                    <div className='rv1'>을 확인해보세요.</div>
                </div>
            </div>
            

            <div className='review-container1'>
                <div className='review-container2'>
                    <div className='review-good'>😊 좋았던 점</div>
                    <div className='review-text'>
                        <div className='review-text1'>좋아하는 음식이에요</div>
                        <div className='review-text2'>15</div>
                    </div>
                    <div className='review-text'>
                        <div className='review-text1'>간이 딱 맞아요</div>
                        <div className='review-text2'>11</div>
                    </div>
                    <div className='review-text'>
                        <div className='review-text1'>속이 편해요</div>
                        <div className='review-text2'>2</div>
                    </div>
                </div>

                <div className='review-bar'></div>

                <div className='review-container2'>
                    <div className='review-bad'>😥 아쉬운 점</div>
                    <div className='review-text'>
                        <div className='review-text1'>느끼해요</div>
                        <div className='review-text2'>13</div>
                    </div>
                    <div className='review-text'>
                        <div className='review-text1'>달아요</div>
                        <div className='review-text2'>9</div>
                    </div>
                    <div className='review-text'>
                        <div className='review-text1'>싱거워요</div>
                        <div className='review-text2'>15</div>
                    </div>
                    <div className='review-text'>
                        <div className='review-text1'>짜요</div>
                        <div className='review-text2'>1</div>
                    </div>
                </div>
            </div>

            <button className='review-detail'>자세한 후기</button>

            <div className='review-container4'>
                <div className='review-nickname-date'>
                    <div className='review-nickname'>송** 님</div>
                    <div className='review-date'>2025년 8월 13일</div>
                </div>
                <div className='review-comment'>아 너무 맛있어요</div>
            </div>

        </div>
            <div className='review-return'>
                <button className='review-return-button'>돌아가기</button>
            </div>

        </div>
        </>
    );
}