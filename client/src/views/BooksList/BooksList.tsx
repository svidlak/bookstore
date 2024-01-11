import { BookCard, BookCardSkeleton, SectionHeader } from '../../components'
import { Book } from '../../models'

interface Props {
    books: Book[]
    header: string
    loading: boolean
}

function BooksList({ books, header, loading }: Props) {
    return (
        <div>
            <SectionHeader title={header} />
            <div className='d-flex flex-row flex-wrap justify-content-between'>
                {
                    books.map((book, idx) => {
                        return loading ? <BookCardSkeleton key={idx} /> : <BookCard key={book.uuid + idx} book={book} />
                    })
                }
            </div>
        </div>
    )
}

export default BooksList