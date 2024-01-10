import './TableRow.scss'
import { Book, FormStateOptions } from '../../models'
import { DeleteIcon, EditIcon } from '../../assets/icons'
import { Link } from 'react-router-dom'
import Button from '@restart/ui/Button'

interface Props {
    book: Book
    handleDelete: (book: Book) => void
}

function TableRow({ book, handleDelete }: Props) {
    const tableDataProperties = [
        book.uuid,
        book.title,
        book.authors,
        book.publicationDate,
        book.category,
        book.price
    ]

    return (
        <tr className='table-row-wrapper row'>
            {
                tableDataProperties.map((property, index) => {
                    if (index === 0) {
                        return <th key={property + index} className='col text-truncate'>{property}</th>
                    }
                    return <td key={property + index} className='col text-truncate'>{property}</td>
                })
            }
            <td className='col-1 text-truncate'>
                <div className='actions d-flex justify-content-center'>
                    <Link to={`/details/${book.uuid}`} state={{ book, formState: FormStateOptions.Edit }}>
                        <Button className='m-1 btn btn-warning btn-sm'>
                            <img src={EditIcon} />
                        </Button>
                    </Link>

                    <Button
                        className='m-1 btn btn-danger btn-sm'
                        onClick={() => handleDelete(book)}
                    >
                        <img src={DeleteIcon} />
                    </Button>
                </div>
            </td>
        </tr>
    )
}

export default TableRow