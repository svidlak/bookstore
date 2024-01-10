import express from 'express';
import { container } from 'tsyringe';

import { BooksController } from './books.controller';

const router = express.Router();
const booksControler = container.resolve(BooksController);
const routeBasePath = '/books';

router.route(routeBasePath)
    .get((req, res) => booksControler.getBooks(req, res))
    .post((req, res) => booksControler.createBook(req, res));

router.route(`${routeBasePath}/:id`)
    .put((req, res) => booksControler.updateBook(req, res))
    .delete((req, res) => booksControler.deleteBook(req, res))

export default router;