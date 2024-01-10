import express from 'express';
import { container } from 'tsyringe';
import { CategoriesController } from './categories.controller';

const routeBasePath = '/categories';

const categoriesController = container.resolve(CategoriesController);
const router = express.Router();

router.route(routeBasePath)
    .get((req, res) => categoriesController.getCategories(req, res))

export default router;