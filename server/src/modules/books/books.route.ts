import express from 'express'
import { container } from 'tsyringe'

import { BooksController } from './books.controller'

const router = express.Router()
const booksControler = container.resolve(BooksController)
const routeBasePath = '/books'

router.route(routeBasePath)
    .get(async (req, res, next) => {
        try { await booksControler.getBooks(req, res) }
        catch (e) { next(e) }
    })
    .post(async (req, res, next) => {
        try { await booksControler.createBook(req, res) }
        catch (e) { next(e) }
    })

router.route(`${routeBasePath}/:id`)
    .put(async (req, res, next) => {
        try { await booksControler.updateBook(req, res) }
        catch (e) { next(e) }
    })
    .delete(async (req, res, next) => {
        try { await booksControler.deleteBook(req, res) }
        catch (e) { next(e) }
    })

export default router