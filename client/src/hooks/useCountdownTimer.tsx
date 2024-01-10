import { useEffect, useState } from 'react'

function useCountdownTimer(hoursCountdown: number) {
    const [timer, setTimer] = useState(hoursCountdown * 60 * 59)

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1)
            }
        }, 1000)
        return () => clearInterval(interval)
    }, [timer])

    const rawHours = Math.floor(timer / 3600)
    const rawMinutes = Math.floor((timer % 3600) / 60)
    const rawSeconds = timer % 60

    const hours = rawHours > 9 ? rawHours.toString() : `0${rawHours}`
    const minutes = rawMinutes > 9 ? rawMinutes.toString() : `0${rawMinutes}`
    const seconds = rawSeconds > 9 ? rawSeconds.toString() : `0${rawSeconds}`

    return { hours, minutes, seconds }
}

export default useCountdownTimer