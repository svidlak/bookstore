import { z } from 'zod';

export const getCategoriesSchema = z.object({}).strict();

export type getCategoriesQueryParams = z.infer<typeof getCategoriesSchema>;