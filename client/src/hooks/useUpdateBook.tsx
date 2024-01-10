import { updateBook } from '../services/api'
import { Book } from '../models'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNotificationStore } from '../store'

function useUpdateBook(book: Book) {
    const setNotificationState = useNotificationStore(state => state.setNotificationState)
    const [bookState, setBookState] = useState(book)

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: (book: Book) => updateBook(book),
        onSuccess: (response: Book) => {
            setBookState(() => response)
            setNotificationState({ notificationVisibility: true, notificationStatus: 'success' })
            queryClient.invalidateQueries({ queryKey: [response.category] })
            queryClient.invalidateQueries({ queryKey: ['allBooks'] })
        },
        onError: (error) => {
            console.log(error)
            setNotificationState({ notificationVisibility: true, notificationStatus: 'danger' })
        }
    })

    return { updateBook: mutate, bookState, loading: isPending }
}

export default useUpdateBook