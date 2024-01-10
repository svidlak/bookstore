import { create } from 'zustand'
import { ActionStatus } from '../models'

type NotificationStateParams = {
    notificationVisibility: boolean,
    notificationStatus?: ActionStatus
}

interface NotificationState {
    isNotificationVisible: boolean
    actionStatus: ActionStatus
    setNotificationState: ({ notificationVisibility, notificationStatus }: NotificationStateParams) => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
    isNotificationVisible: false,
    actionStatus: 'secondary',
    setNotificationState: ({
        notificationVisibility,
        notificationStatus
    }) => set({
        isNotificationVisible: notificationVisibility,
        actionStatus: notificationStatus
    })
}))