import { useLocation, Navigate } from 'react-router-dom'
import { BooksList } from '../../views'
import { useCategories, useBooks } from '../../hooks'
import { CategoryCard } from '../../components'

function BooksByCategory() {
    const { state } = useLocation()
    const { categories, isLoading: categoriesLoading } = useCategories()

    const currentCategory = categories.find(({ name }) => name === state?.categoryName)

    const { books, isLoading: booksLoading } = useBooks({
        limit: 8,
        category: currentCategory?.name ? currentCategory?.name.toLowerCase() : undefined
    })

    if (!categoriesLoading && !currentCategory) {
        return <Navigate to='/not-found' />
    }

    return (<div className='d-flex align-items-center flex-column'>
        <div className='my-5'>
            <CategoryCard text={currentCategory?.name} image={currentCategory?.image} />
        </div>
        <div className='w-100'>
            <BooksList books={books} loading={booksLoading} header={`${state?.categoryName} books`} />
        </div>
    </div>)
}

export default BooksByCategory