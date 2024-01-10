import { useQuery } from '@tanstack/react-query'
import { Book } from '../models'
import { getBooks } from '../services/api'

function useBooks({ limit, category }: { limit?: number, category?: string }) {
    const { data, isLoading } = useQuery({
        queryKey: [category || 'allBooks', limit || 'all'],
        queryFn: () => getBooks({ limit, category }),
        enabled: !!(limit || category)
    })

    return { books: (data || []) as Book[], isLoading }
}

export default useBooks