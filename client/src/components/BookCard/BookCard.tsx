import './BookCard.scss'
import { Book, FormStateOptions } from '../../models'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'

interface Props {
    book: Book
}

function BookCard({ book }: Props) {
    return (<div
        className='book-card-wrapper d-flex flex-column justify-content-between center-text mt-5'>
        <div className='cover-img' style={{ backgroundImage: `url(${book.imageUrl})` }}></div>
        <div className='show-more-button-wrapper'>
            <Link to={`/details/${book.uuid}`} state={{ book, formState: FormStateOptions.Read }}>
                <Button variant='secondary'>More info</Button>
            </Link>
        </div>
        <p className='text-start p-2 pb-0 mb-1 book-title'>{book.title}</p>

        <div className='text-start p-2 pt-0'>
            <p className='book-price m-0'>$ {book.price}</p>
        </div>

    </div>)
}

export default BookCard