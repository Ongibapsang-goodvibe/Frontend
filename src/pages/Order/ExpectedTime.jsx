import "../../assets/styles/ExpectedTime.css"

export default function ExpectedTime() {
    return (
        <>
        <div className='Wrapper'>
            <div className='etplace'>
                <img src="/place.svg" width={16.5} height={22} ></img>
                <div className='etpltext'>서대문구 대현동</div>
            </div>

            <div className='ett1'>30분 뒤</div>
            <div className='ett2'>음식 도착예정</div>
            <div className='ettime'>
                <div className='ett3'>도착예정시간 : </div>
                <div className='ett3'>12시 30분</div>
            </div>

            <div className='recombox'>
                {/* 유튜브 영상 대체*/}
                <img src="/video.svg"></img>
                <div className='videotext1'>오늘의 추천</div>
                <div className='videotext2'>건강 영상</div>

                <button className='recombt'>
                    <div className='etrecomtext'>다른 영상 추천받기</div>
                </button>
            </div>

        </div>
        </>
    );
}