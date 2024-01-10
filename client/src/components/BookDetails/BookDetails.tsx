import './BookDetails.scss'
import { Book, FormState, FormStateOptions } from '../../models'
import Button from 'react-bootstrap/esm/Button'

interface Props {
    book: Book
    setFormState: (x: FormState) => void
}

function BookDetails({ book, setFormState }: Props) {
    const createdAt = new Date(book.created_at).toISOString().substring(0, 19)
    const updatedAt = new Date(book.updated_at).toISOString().substring(0, 19)

    return (<div className='book-details-wrapper text-start'>
        <div>
            <div className='d-flex justify-content-between'>
                <div>
                    <h3>
                        {book.title}
                        <span className='ms-3 price-wrapper'>
                            <Button variant='danger' size='lg'>$ {book.price}</Button>
                        </span>
                    </h3>
                </div>
                <div onClick={() => setFormState(FormStateOptions.Edit)}>
                    <Button variant='warning'>Edit</Button>
                </div>
            </div>
            <h5><span>Aurhor(s):</span> {book.authors}</h5>
            <div>
                <span>Category:</span> {book.category}<br />
                <span>Publishion date:</span> {book.publicationDate}<br />
            </div>
            <div className='mt-2'>
                <span>Created at:</span> {createdAt}<br />
                <span>Updated at:</span> {updatedAt}
            </div>
            <p className='mt-5'>{book.description}</p>
        </div>
    </div>)
}

export default BookDetails