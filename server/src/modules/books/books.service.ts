import { injectable } from "tsyringe";
import { v4 } from "uuid";
import { Database } from "../../utils/database";
import { createBookBody, getBooksQueryParams, updateBook } from "./books.schemas";
import { Book } from "./books.model";

@injectable()
export class BooksService {
    dbClient: Database;

    constructor(dbClient: Database) {
        this.dbClient = dbClient;
    }
    async getBooks(query: getBooksQueryParams) {
        return this.dbClient.getFromDb(query);
    }

    async updateBook({ id, data }: updateBook) {
        return this.dbClient.updateInDb({ id, data });
    }

    async deleteBook(id: string) {
        return this.dbClient.deleteFromDb(id);
    }

    async createBook(bookBody: createBookBody) {
        const newBook: Book = {
            ...bookBody,
            uuid: v4(),
            publicationDate: new Date().toISOString().substring(0, 10),
            updated_at: Date.now(),
            created_at: Date.now()
        }

        this.dbClient.insertToDb(newBook);
        return newBook
    }
}