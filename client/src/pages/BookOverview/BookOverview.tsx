import { Navigate, useLocation } from 'react-router-dom'
import { Book, FormState, FormStateOptions } from '../../models'
import { BookDetailsController } from '../../views'

function BookOverview() {
    const { state } = useLocation()
    const book: Book = state?.book
    const formState: FormState = state?.formState

    if (!state?.book?.uuid && formState !== FormStateOptions.Create) {
        return <Navigate to='/not-found' />
    }

    return (
        <div className='book-overview-wrapper mt-5'>
            <BookDetailsController book={book} formState={formState} />
        </div>
    )
}

export default BookOverview