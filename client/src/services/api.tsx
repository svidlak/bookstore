import { Book } from '../models'
import { IMAGE_BASE_PATH, client } from './requestClient'

console.log(import.meta.env)

export async function getCategories() {
    const { data } = await client.get(`/categories`)
    return data
}

export async function getBooks({ limit, category }: { limit?: number, category?: string }) {
    const filteredParams = Object.fromEntries(
        Object.entries({ limit, category }).filter(([_, value]) => value)
    )

    const options = {
        url: '/books',
        method: 'GET',
        params: filteredParams
    }

    const { data } = await client(options)

    data.forEach((book: Book) => {
        book.imageUrl = IMAGE_BASE_PATH + book.imageUrl
    })
    return data
}

export async function updateBook(book: Book) {
    const { uuid, title, authors, price, category, description } = book

    const options = {
        url: `/books/${uuid}`,
        method: 'PUT',
        data: JSON.stringify({ title, authors, price: Number(price), category, description })
    }

    const { data } = await client(options)
    return data
}

export async function deleteBook(uuid: string) {
    const options = {
        url: `/books/${uuid}`,
        method: 'DELETE'
    }

    await client(options)
    return true
}

export async function createBook(book: Book, file: File) {
    const { imageUrl } = await uploadImage(file)
    book.imageUrl = imageUrl
    const newBook = await postBook(book)
    return newBook
}

async function postBook(book: Book) {
    book.price = Number(book.price)

    const options = {
        url: `/books`,
        method: 'POST',
        data: JSON.stringify(book)
    }

    const { data } = await client(options)
    return data
}

async function uploadImage(file: File) {
    const formData = new FormData()
    formData.append('photo', file)

    const options = {
        url: `/upload`,
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
    }

    const { data } = await client(options)
    return data
}