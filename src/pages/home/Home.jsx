import "../../assets/styles/Home.css";

export default function Home() {
    return (
        <div className='Wrapper'>
            <div className='logo'>
                <img src="/TopBarLogo.svg"></img>
            </div>
            <div className='place'>
                <img src="/place.svg" width={16.5} height={22} ></img>
                <div className='pltext'>서대문구 대현동</div>
            </div>
            <div className='q1'>무엇을 드시고 싶으세요?</div>
            <div className='bt'>
                <button className='recom'>
                    <div className='recomtext'>음식 추천받기</div>
                </button>
                <button className='recent'>
                    <div className='recenttext'>최근 주문한 음식</div>
                </button>
                
            </div>
            <div className='inputbox'>
                <img src="/keybord.svg" height={38} width={38} ></img>
                <div className='inputtext'>글자로 입력</div>
            </div>
            <div className='voicebox'>
                <img src="/mic.svg" height={58} width={36.25} ></img>
                <div className='voicetext'>눌러서 말하기</div>
            </div>
        </div>
    );
}
