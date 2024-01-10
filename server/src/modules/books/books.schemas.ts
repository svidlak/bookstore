import { sqliteTable, uniqueIndex, index, text, integer } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

import { z } from 'zod';
import { validate } from 'uuid';

export const booksSchema = sqliteTable('books', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    uuid: text('uuid').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    authors: text('authors').notNull(),
    publicationDate: text('publicationDate').notNull(),
    category: text('category').notNull(),
    imageUrl: text('imageUrl').notNull(),
    price: integer('price').notNull(),
    updated_at: integer('updated_at').default(Date.now()),
    created_at: integer('created_at').default(Date.now()),
    active: integer('active').default(1)
}, (table) => {
    return {
        idx_books_uuid: uniqueIndex('uuid').on(table.uuid),
        idx_books_category: index('category').on(table.category)
    }
});

export const createBookSchema = createInsertSchema(booksSchema).pick({
    title: true,
    authors: true,
    price: true,
    category: true,
    description: true,
    imageUrl: true
}).strict();

export const updateBookSchema = createInsertSchema(booksSchema).pick({
    title: true,
    authors: true,
    price: true,
    category: true,
    description: true,
}).strict()

export const getBooksSchema = z.object({
    category: z.string().optional(),
    limit: z.string().optional()
}).strict();


export const uuidRequestParam = z.object({
    id: z.string().refine(value => validate(value)),
}).strict()


export const targetBookSchema = createSelectSchema(booksSchema).strict()
export const booksArraySchema = z.array(targetBookSchema)

export type CreateBook = z.infer<typeof createBookSchema>;
export type UpdateBook = z.infer<typeof updateBookSchema>
export type QueryParams = z.infer<typeof getBooksSchema>;
