import Toast from 'react-bootstrap/Toast'
import { useNotificationStore } from '../../store'
import { useEffect } from 'react'
import { ActionStatus } from '../../store/useNotificationStore'

function ToastNotification() {
    const {
        isNotificationVisible,
        actionStatus,
        setNotificationState
    } = useNotificationStore(state => state)

    useEffect(() => {
        const timeout = setTimeout(() => setNotificationState({
            notificationVisibility: false,
        }), 2000)

        return () => clearTimeout(timeout)
    }, [isNotificationVisible])

    const notificationMessage = (status: ActionStatus) => {
        return status === 'success' ? 'Action saved successfully'
            : status === 'danger' ? 'Action failed'
                : 'Generic message'
    }
    return (
        <Toast show={isNotificationVisible} className='p-2' bg={actionStatus}>
            <Toast.Body>{notificationMessage(actionStatus)}</Toast.Body>
        </Toast>
    )
}

export default ToastNotification