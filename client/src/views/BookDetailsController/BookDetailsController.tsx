import './BookDetailsController.scss'
import { Book, FormState, FormStateOptions } from '../../models'
import { AlertModal, BookDetails, BookForm, UploadImage } from '../../components'
import { useState } from 'react'
import { useCategories, useUpdateBook, useCreateBook } from '../../hooks'

type Props = {
    book: Book
    formState: FormState
}

function BookDetailsController({ book, formState }: Props) {
    const [formStateValue, setFormState] = useState<FormState>(formState)
    const [tempImageFile, setTempImageFile] = useState<File | null>(null)
    const [showAlert, setShowAlert] = useState(false)

    const { bookState, updateBook, loading: updateBookLoading } = useUpdateBook(book)
    const { categories } = useCategories()
    const { createBook, loading: createBookLoading } = useCreateBook()

    const uploadTmpImage = (image: File) => setTempImageFile(() => image)

    const updateBookHandler = async (book: Book) => {
        if (formStateValue === FormStateOptions.Edit) {
            updateBook(book)
        }
        if (formStateValue === FormStateOptions.Create) {
            if (!tempImageFile) {
                setShowAlert(true)
            } else {
                createBook({ book, file: tempImageFile })
            }
        }
    }

    return (
        <div className='d-flex'>
            {
                (formStateValue === FormStateOptions.Create) ?
                    <UploadImage uploadImage={uploadTmpImage} />
                    : <div className='image-wrapper' style={{ backgroundImage: `url(${book.imageUrl})` }} />
                    
            }

            <div className='px-5 book-details-controller-wrapper'>
                {
                    (formStateValue === FormStateOptions.Read) ?
                        <BookDetails
                            book={bookState}
                            setFormState={setFormState} />
                        : <BookForm
                            book={bookState}
                            loading={(updateBookLoading || createBookLoading)}
                            categories={categories}
                            formState={formStateValue}
                            setFormState={setFormState}
                            updateBookHandler={updateBookHandler} />

                }
            </div>
            <AlertModal
                show={showAlert}
                title={'Image Upload'}
                content={<>Please upload an Image</>}
                handleConfirm={() => setShowAlert(false)}
                handleClose={() => setShowAlert(false)}
            />
        </div>
    )
}

export default BookDetailsController