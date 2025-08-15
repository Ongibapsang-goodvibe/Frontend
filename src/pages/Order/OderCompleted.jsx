import "../../assets/styles/OrderCompleted.css";

export default function OrderCompleted() {
    return (
        <>
        <div className='Wrapper'>
            <div className='och'>주문완료</div>
            <div className='t1'>약 30분 뒤</div>
            <div className='t2'>도착 예정</div>
            <div className='time'>
                <div className='t3'>도착예정시간 : </div>
                <div className='t3'>12시 30분</div>
            </div>
            <div className='bobby-oc'>
                <img src="./order-completed.svg"></img>
            </div>
        </div>
        </>
    );
}