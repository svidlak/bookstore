import { Response, Request } from 'express';
import { singleton } from "tsyringe";

import { BooksService } from "./books.service";
import { createBookBody, createBookSchema, deleteBookSchema, getBooksQueryParams, getBooksSchema, updateBookSchema } from './books.schemas';


@singleton()
export class BooksController {
    booksService: BooksService;

    constructor(booksService: BooksService) {
        this.booksService = booksService;
    }

    async getBooks(req: Request, res: Response) {
        const validationResult = getBooksSchema.safeParse(req.query);
        if (!validationResult.success) {
            return res.status(403).json(validationResult.error.errors)
        }

        const query: getBooksQueryParams = req.query;

        const books = await this.booksService.getBooks(query);
        res.status(200).json(books);
    }

    async createBook(req: Request, res: Response) {
        const validationResult = createBookSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(403).json(validationResult.error.errors)
        }

        const newBook: createBookBody = req.body;
        const createdBook = await this.booksService.createBook(newBook);
        res.status(200).json(createdBook);
    }

    async updateBook(req: Request, res: Response) {
        const validationResult = updateBookSchema.safeParse({ params: req.params, body: req.body });
        if (!validationResult.success) {
            return res.status(403).json(validationResult.error.errors)
        }

        const updatedBook = await this.booksService.updateBook({ id: req.params.id, data: req.body });
        res.status(200).json(updatedBook)
    }

    async deleteBook(req: Request, res: Response) {
        const validationResult = deleteBookSchema.safeParse({ params: req.params });
        if (!validationResult.success) {
            return res.status(403).json(validationResult.error.errors)
        }

        const resp = await this.booksService.deleteBook(req.params.id)
        if (!resp) {
            return res.sendStatus(404)
        }
        res.sendStatus(204)
    }
}