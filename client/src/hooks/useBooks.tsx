import { useQuery } from '@tanstack/react-query'
import { Book } from '../models'
import { getBooks } from '../services/api'

const placeholderArray = new Array(6).fill({});

function useBooks({ limit, category }: { limit?: number, category?: string }) {
    const { data = placeholderArray, isLoading } = useQuery({
        queryKey: [category || 'allBooks', limit || 'all'],
        queryFn: () => getBooks({ limit, category }),
        enabled: !!(limit || category)
    })

    return { books: data as Book[], isLoading }
}

export default useBooks