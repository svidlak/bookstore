import { z } from 'zod';
import { validate } from 'uuid';

export const getBooksSchema = z.object({
    category: z.string().optional(),
    limit: z.string().optional()
}).strict();

export type getBooksQueryParams = z.infer<typeof getBooksSchema>;

export const updateBookSchema = z.object({
    body: z.object({
        title: z.string(),
        authors: z.string(),
        price: z.string().refine(value => !isNaN(Number(value))),
        category: z.string(),
        description: z.string(),
    }),
    params: z.object({
        id: z.string().refine(value => validate(value)),
    }),
}).strict();

type updateBookParams = z.infer<typeof updateBookSchema>;

export type updateBook = {
    id: updateBookParams['params']['id'];
    data: {
        title: updateBookParams['body']['title'];
        authors: updateBookParams['body']['authors'];
        price: updateBookParams['body']['price'];
        category: updateBookParams['body']['category'];
        description: updateBookParams['body']['description'];
    };
};

export const deleteBookSchema = z.object({
    params: z.object({
        id: z.string().refine(value => validate(value)),
    }),
}).strict();

export type deleteBookParams = z.infer<typeof deleteBookSchema>;

export const createBookSchema = z.object({
    title: z.string(),
    authors: z.string(),
    price: z.string().refine(value => !isNaN(Number(value))),
    category: z.string(),
    description: z.string(),
    imageUrl: z.string()
}).strict();

export type createBookBody = z.infer<typeof createBookSchema>;
