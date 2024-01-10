import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBook } from '../services/api';
import { useNotificationStore } from '../store';
import { Book } from '../models';

function useDeleteBook() {
    const setNotificationState = useNotificationStore(state => state.setNotificationState)

    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: (book: Book) => deleteBook(book.uuid),
        onSuccess: () => {
            setNotificationState({ notificationVisibility: true, notificationStatus: 'success' })
            queryClient.invalidateQueries({ queryKey: ['allBooks'] })
        },
        onError: (error) => {
            console.log(error)
            setNotificationState({ notificationVisibility: true, notificationStatus: 'danger' })
        }
    })

    return { deleteBook: mutate, loading: isPending }
}

export default useDeleteBook