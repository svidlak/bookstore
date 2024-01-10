import './BookForm.scss'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Book, Category, FormState, FormStateOptions } from '../../models'

interface Props {
    book: Book
    loading: boolean
    categories: Category[]
    formState: FormState
    setFormState: (x: FormState) => void
    updateBookHandler: (book: Book) => void
}

function BookForm({ book, loading, categories, formState, setFormState, updateBookHandler }: Props) {
    const categoryValues = categories.map(({ name }) => name.toLocaleLowerCase())
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: book })
    const navigate = useNavigate()

    return (
        <Form
            onSubmit={handleSubmit(updateBookHandler)}
            className='text-start'>

            <Form.Group as={Row} className='mb-3' >
                <Form.Label column sm='2'>Title</Form.Label>
                <Col sm='10'>
                    <Form.Control
                        type='text'
                        placeholder='Title'
                        disabled={loading}
                        {...register('title', { required: 'Title must be atleast 1 string length', min: 1 })}
                    />
                    <span className='error-message'>{errors?.title?.message}</span>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3' >
                <Form.Label column sm='2'>Authors</Form.Label>
                <Col sm='10'>
                    <Form.Control
                        type='text'
                        placeholder='Authors'
                        disabled={loading}
                        {...register('authors', { required: 'Authors must be atleast 1 string length', min: 1 })}
                    />
                    <span className='error-message'>{errors?.authors?.message}</span>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3' >
                <Form.Label column sm='2'>Price</Form.Label>
                <Col sm='10'>
                    <Form.Control
                        step='any'
                        type='number'
                        placeholder='Price'
                        disabled={loading}
                        {...register('price', { required: 'Price must be set', min: 1 })}
                    />
                    <span className='error-message'>{errors?.price?.message}</span>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3' >
                <Form.Label column sm='2'>Category</Form.Label>
                <Col sm='10'>
                    <Form.Select
                        disabled={loading}
                        {...register('category', { required: 'Select category', min: 1 })}
                    >
                        {
                            categoryValues.map((category, index) => {
                                return (
                                    <option key={category + index}>{category}</option>
                                )
                            })
                        }
                    </Form.Select>
                    <span className='error-message'>{errors?.category?.message}</span>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3' >
                <Form.Label column sm='2'>Description</Form.Label>
                <Col sm='10'>
                    <Form.Control
                        as='textarea'
                        rows={5}
                        disabled={loading}
                        placeholder='Description'
                        {...register('description', { required: 'Price must be set', min: 1 })}
                    />
                    <span className='error-message'>{errors?.description?.message}</span>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='pt-3' >
                <Col sm='2' />
                <Col sm='10'>
                    <div className='d-flex gap-4'>
                        <Button
                            variant={!Object.keys(errors).length ? 'danger' : 'secondary'}
                            size='lg'
                            type='submit'
                            disabled={loading || !!Object.keys(errors).length}>
                            Submit form
                        </Button>
                        <Button
                            variant='secondary'
                            size='lg'
                            disabled={loading}
                            onClick={() => formState === FormStateOptions.Create ? navigate(-1) : setFormState(FormStateOptions.Read)}
                        >Cancel</Button>
                    </div>
                </Col>
            </Form.Group>
        </Form>
    )
}

export default BookForm