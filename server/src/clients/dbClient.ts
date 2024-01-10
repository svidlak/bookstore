import { singleton } from 'tsyringe'
import { QueryParams } from '../modules/books/books.schemas'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { eq, desc, and, SQLWrapper } from 'drizzle-orm'
import { SQLiteTable, TableConfig } from 'drizzle-orm/sqlite-core'
import { AUTH_TOKEN, DATABASE_URL } from '../configs/environment'
import logger from '../utils/logger'

type CommonSchemaProperties = {
    uuid: SQLWrapper
    category: SQLWrapper
    active: SQLWrapper
    id: SQLWrapper
} & SQLiteTable<TableConfig>

type GenericDataObject = { [x: string]: any }

@singleton()
export class DbClient {
    dbClient

    constructor() {
        const client = createClient({
            url: DATABASE_URL as string,
            authToken: AUTH_TOKEN
        })
        this.dbClient = drizzle(client)
    }

    async select(queryParams: QueryParams, schema: CommonSchemaProperties) {
        const { limit = '10', category } = queryParams

        const conditions = [eq(schema.active, 1)]

        const selected = this.dbClient.select().from(schema)

        if (category) {
            conditions.push(eq(schema.category, category))
        }

        const whereClause = conditions.length > 1 ? and(...conditions) : conditions[0]

        selected
            .where(whereClause)
            .orderBy(desc(schema.id))
            .limit(parseInt(limit))

        const { rows } = await selected.run()
        return rows
    }

    async insert(data: GenericDataObject, schema: CommonSchemaProperties) {
        const [created] = await this.dbClient.insert(schema).values(data).returning()
        if (!created) {
            logger.warn('Failed to create new entry')
            return false
        }
        return created
    }

    async update(id: string, data: GenericDataObject, schema: CommonSchemaProperties) {
        data.updated_at = Date.now()

        const [updated] = await this.dbClient
            .update(schema)
            .set(data)
            .where(eq((schema as any).uuid, id))
            .returning()

        if (!updated) {
            logger.warn(`Failed to update ${id}`)
            return false
        }
        return updated
    }

    async delete(id: string, schema: CommonSchemaProperties) {
        const [deleted] = await this.dbClient
            .update(schema)
            .set({ active: 0, updated_at: Date.now() })
            .where(eq(schema.uuid, id))
            .returning()

        if (!deleted) {
            logger.warn('Failed to delete existing entry')
            return false
        }

        return deleted
    }
}