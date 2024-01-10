import { useBooks } from '../../hooks'
import { BooksTable } from '../../views'

function AllBooks() {
    const { books } = useBooks({ limit: 100 })

    return (<div className='mt-5'>
        <BooksTable books={books}/>
    </div>)
}

export default AllBooks