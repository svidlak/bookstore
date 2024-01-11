import './BookCardSkeleton.scss'

function BookCardSkeleton() {
    return (<div
        className='book-card-skeleton-wrapper d-flex flex-column justify-content-between center-text mt-5'>
        <div className='cover-img'></div>
        <p className='text-start m-2 pb-0 mb-1 book-title'>&nbsp;</p>

        <div className='text-start m-2 pt-0'>
            <p className='book-price m-0'>&nbsp;</p>
        </div>

    </div>)
}

export default BookCardSkeleton