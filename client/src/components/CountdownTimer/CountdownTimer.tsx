import './CountdownTimer.scss'
import { useCountdownTimer } from '../../hooks'

type Props = {
    title: string
    subtitle: string
}
const hoursCountdown = 10

function CountdownTimer({ title, subtitle }: Props) {
    const { hours, minutes, seconds } = useCountdownTimer(hoursCountdown)

    return (
        <div className='countdown-timer-wrapper d-flex flex-column justify-content-center py-3'>
            <span className='fs-5 fw-bold'>{title}</span>
            <p>{subtitle}</p>
            <div className='timer-wrapper d-flex justify-content-center gap-1 fs-1 pt-2'>
                <span>{hours}</span>
                <span className='dots'>:</span>
                <span>{minutes}</span>
                <span className='dots'>:</span>
                <span>{seconds}</span>
            </div>
        </div>
    )
}

export default CountdownTimer