import { Response, Request } from 'express'
import { injectable } from "tsyringe"

import { BooksService } from "./books.service"

import {
    CreateBook,
    QueryParams,
    UpdateBook,
    booksArraySchema,
    createBookSchema,
    getBooksSchema,
    targetBookSchema,
    updateBookSchema,
    uuidRequestParam
} from './books.schemas'
import logger from '../../utils/logger'

@injectable()
export class BooksController {
    booksService: BooksService

    constructor(booksService: BooksService) {
        this.booksService = booksService
    }

    async getBooks(req: Request, res: Response) {
        const queryValidationResult = getBooksSchema.safeParse(req.query)
        if (!queryValidationResult.success) {
            return res.status(403).json(queryValidationResult.error.errors)
        }

        const query: QueryParams = queryValidationResult.data

        const books = await this.booksService.getBooks(query)
        const validatedBooks = booksArraySchema.safeParse(books)

        if (!validatedBooks.success) {
            logger.error(JSON.stringify(validatedBooks.error.errors))
            return res.status(400).json({ error: 'Response validation failed' })
        }

        res.status(200).json(validatedBooks.data)
    }

    async createBook(req: Request, res: Response) {
        const bodyValidationResult = createBookSchema.safeParse(req.body)
        if (!bodyValidationResult.success) {
            return res.status(403).json(bodyValidationResult.error.errors)
        }

        const newBook: CreateBook = bodyValidationResult.data
        const createdBook = await this.booksService.createBook(newBook)

        const validatedBook = targetBookSchema.safeParse(createdBook)

        if (!validatedBook.success) {
            logger.error(JSON.stringify(validatedBook.error.errors))
            return res.status(400).json({ error: 'Response validation failed' })
        }

        res.status(201).json(validatedBook.data)
    }

    async updateBook(req: Request, res: Response) {
        const paramsValidationResults = uuidRequestParam.safeParse(req.params)
        const bodyValidationResult = updateBookSchema.safeParse(req.body)

        if (!paramsValidationResults.success) {
            return res.status(403).json(paramsValidationResults.error.errors)
        }

        if (!bodyValidationResult.success) {
            return res.status(403).json(bodyValidationResult.error.errors)
        }

        const bookId = paramsValidationResults.data.id
        const bookData: UpdateBook = bodyValidationResult.data
        const updatedBook = await this.booksService.updateBook(bookId, bookData)

        const validatedBook = targetBookSchema.safeParse(updatedBook)

        if (!validatedBook.success) {
            logger.error(JSON.stringify(validatedBook.error.errors))
            return res.status(400).json({ error: 'Response validation failed' })
        }

        res.status(201).json(updatedBook)
    }

    async deleteBook(req: Request, res: Response) {
        const paramsValidationResults = uuidRequestParam.safeParse(req.params)
        if (!paramsValidationResults.success) {
            return res.status(403).json(paramsValidationResults.error.errors)
        }

        const deletedBook = await this.booksService.deleteBook(req.params.id)

        const validatedBook = targetBookSchema.safeParse(deletedBook)

        if (!validatedBook.success) {
            logger.error(JSON.stringify(validatedBook.error.errors))
            return res.status(400).json({ error: 'Response validation failed' })
        }
        
        res.sendStatus(204)
    }
}