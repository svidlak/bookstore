import { injectable } from "tsyringe"
import { v4 } from "uuid"
import { DbClient } from "../../clients/dbClient"
import { CreateBook, QueryParams, UpdateBook, booksSchema } from "./books.schemas"

@injectable()
export class BooksService {
    dbClient: DbClient

    constructor(dbClient: DbClient) {
        this.dbClient = dbClient
    }

    getBooks(query: QueryParams) {
        return this.dbClient.select(query, booksSchema)
    }

    updateBook(id: string, data: UpdateBook) {
        return this.dbClient.update(id, data, booksSchema)
    }

    deleteBook(id: string) {
        return this.dbClient.delete(id, booksSchema)
    }

    createBook(bookBody: CreateBook) {
        return this.dbClient.insert({
            ...bookBody,
            uuid: v4(),
            publicationDate: new Date().toISOString().substring(0, 10),
        }, booksSchema)
    }
}