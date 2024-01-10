import { BookCard, SectionHeader } from '../../components'
import { Book } from '../../models'

type Props = {
    books: Book[]
    header: string
}
function BooksList({ books, header }: Props) {
    return (
        <div>
            <SectionHeader title={header} />
            <div className='d-flex flex-row flex-wrap justify-content-between'>
                {
                    books.map(book => {
                        return (<BookCard key={book.uuid} book={book} />)
                    })
                }
            </div>
        </div>
    )
}

export default BooksList