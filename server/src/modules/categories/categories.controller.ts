import { Request, Response } from 'express';
import { singleton } from "tsyringe";
import { getCategoriesSchema } from './categories.schemas';

@singleton()
export class CategoriesController {
    getCategories(req: Request, res: Response) {
        const validationResult = getCategoriesSchema.safeParse(req.query);
        if(!validationResult.success) {
            return res.status(403).json(validationResult.error.errors)
        }
        const categories = ['fiction', 'satire', 'mystery', 'drama', 'horror', 'romance']
        res.status(200).json(categories)
    }
}