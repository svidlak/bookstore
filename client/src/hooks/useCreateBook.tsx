import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBook } from "../services/api";
import { Book } from "../models";
import { useNotificationStore } from "../store";

function useCreateBook() {
    const setNotificationState = useNotificationStore(state => state.setNotificationState)
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: ({ book, file }: { book: Book, file: File }) => createBook(book, file),
        onSuccess: (response: Book) => {
            setNotificationState({ notificationVisibility: true, notificationStatus: 'success' })
            queryClient.invalidateQueries({ queryKey: [response.category] })
            queryClient.invalidateQueries({ queryKey: ['allBooks'] })
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return { createBook: mutate, loading: isPending }
}

export default useCreateBook