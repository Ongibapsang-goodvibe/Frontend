export default function formatDeliveryTime(seconds) {
    if (seconds < 60) {
        return `${seconds}초`;
    } else {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (remainingSeconds === 0) {
            return `${minutes}분`;
        } else {
            return `${minutes}분 ${remainingSeconds}초`;
        }
    }
}