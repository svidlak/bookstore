import { updateBook } from '../services/api'
import { Book } from '../models'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNotificationStore } from '../store'
import { ActionStatusOptions } from '../models/ActionStatus'

function useUpdateBook(book: Book) {
    const setNotificationState = useNotificationStore(state => state.setNotificationState)
    const [bookState, setBookState] = useState(book)

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: (book: Book) => updateBook(book),
        onSuccess: (response: Book) => {
            setBookState(() => response)
            setNotificationState({ notificationVisibility: true, notificationStatus: ActionStatusOptions.Success })
            queryClient.invalidateQueries({ queryKey: [response.category] })
            queryClient.invalidateQueries({ queryKey: ['allBooks'] })
        },
        onError: (error) => {
            console.log(error)
            setNotificationState({ notificationVisibility: true, notificationStatus: ActionStatusOptions.Danger })
        }
    })

    return { updateBook: mutate, bookState, loading: isPending }
}

export default useUpdateBook