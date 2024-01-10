import { singleton } from "tsyringe";
import DB_MOCK from './DB.json';
import { getBooksQueryParams, updateBook } from "../modules/books/books.schemas";
import { Book } from "../modules/books/books.model";


@singleton()
export class Database {
    DB: Book[]

    constructor() {
        this.DB = DB_MOCK as Book[];
    }

    async getFromDb({ limit = '10', category }: getBooksQueryParams) {
        let results = this.DB.sort((a, b) => b.updated_at - a.updated_at);

        if (category) {
            results = this.DB.filter((item) => item.category === category)
        }
        if (limit) {
            results = results ? results.slice(0, parseInt(limit)) : this.DB.slice(0, parseInt(limit))
        }
        return results
    }

    insertToDb(data: Book) {
        this.DB.push(data)
    }

    updateInDb({ id, data }: updateBook) {
        const foundIndex = this.DB.findIndex(({ uuid }) => uuid === id);
        if (foundIndex === -1) {
            // throw new Error('Item not found')
            console.log({ id, data })
        }
        this.DB[foundIndex] = {
            ...this.DB[foundIndex],
            ...data,
            updated_at: Date.now()
        }

        return this.DB[foundIndex];
    }

    deleteFromDb(id: string) {
        const foundIndex = this.DB.findIndex(({ uuid }) => uuid === id);
        if (foundIndex === -1) {
            // throw new Error('Item not found')
            console.log(id)
            return false
        }

        this.DB.splice(foundIndex, 1);
        return true

    }
}