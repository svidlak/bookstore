import './BooksTable.scss'
import { Book, FormStateOptions } from '../../models'
import { AlertModal, TableRow } from '../../components'
import { useState } from 'react'
import useDeleteBook from '../../hooks/useDeleteBook'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'

type Props = {
    books: Book[]
}

function BooksTable({ books }: Props) {
    const [showAlert, setShowAlert] = useState(false)
    const [selectedBook, setSelectedBook] = useState({} as Book)
    const { deleteBook } = useDeleteBook()
    const headers = ['ID', 'Title', 'Authors', 'Publication', 'Category', 'Price', '']

    const handleDeleteConfirmation = (book: Book) => {
        setSelectedBook(() => book)
        setShowAlert(() => true)
    }

    const handleDelete = () => {
        deleteBook(selectedBook)
        setShowAlert(() => false)
    }

    return (
        <div>
            <Link to={'/new-book'} state={{ formState: FormStateOptions.Create }}><Button className='float-end m-4 me-0 mt-0' variant='success'>New Book</Button></Link>
            <table className='table  table-dark table-hover'>
                <thead>
                    <tr className='row'>
                        {
                            headers.map((header, index) => {
                                return (<th key={header + index} className={`${index === headers.length - 1 ? 'col-1' : 'col'} text-truncate`}>{header}</th>)
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((book, index) =>
                            <TableRow
                                key={book.uuid + index}
                                book={book}
                                handleDelete={handleDeleteConfirmation}
                            />)
                    }
                </tbody>
            </table>
            <AlertModal
                show={showAlert}
                title={`Delete Book?`}
                content={<div>
                    Are you sure you want to delete
                    <span className='accent-color'>
                        <b> {selectedBook?.title} </b>
                    </span>?
                </div>
                }
                handleClose={() => setShowAlert(() => false)}
                handleConfirm={handleDelete}
            />
        </div>
    )
}

export default BooksTable