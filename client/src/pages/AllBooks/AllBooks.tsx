import { useBooks } from '../../hooks'
import { BooksTable } from '../../views'

function AllBooks() {
    const { books, isLoading } = useBooks({ limit: 100 })

    return (<div className='mt-5'>
        <BooksTable loading={isLoading} books={books}/>
    </div>)
}

export default AllBooks