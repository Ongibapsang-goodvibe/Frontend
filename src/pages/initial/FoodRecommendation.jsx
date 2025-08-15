import '../../assets/styles/FoodRecommendation.css';

export default function FoodRecommendation() {
    return (
        <>
        <div className='Wrapper'>
            <div className='hslogo'>
                <img src="/TopBarLogo.svg"></img>
            </div>
            <div className='fr'>이런 음식은 되도록</div>
            <div className='fr'>추천드리지 않을게요</div>

            <div className='notrecomlist'>
                <div className='frlist'>액상과당</div>
            </div>

            <div className='frcfbox'>
                <button className='frcfbt'>확인</button>
            </div>
        </div>
        </>
    )
}