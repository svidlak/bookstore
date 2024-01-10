import 'reflect-metadata'
import { container } from 'tsyringe'

import { BooksController } from '../../modules/books/books.controller'
import { BooksService } from '../../modules/books/books.service'

import { Response, Request } from 'express'
import { booksArray } from '../testHelpers'

describe('BooksController', () => {
    let booksController: BooksController
    let mockBooksService: jest.Mocked<BooksService>
    let mockRequest: Partial<Request>
    let mockResponse: Partial<Response>
    let booksList: any[]


    beforeEach(() => {

        mockBooksService = {
            getBooks: jest.fn(),
            createBook: jest.fn(),
            updateBook: jest.fn(),
            deleteBook: jest.fn(),
        } as unknown as jest.Mocked<BooksService>

        mockRequest = {
            body: jest.fn(),
            query: jest.fn(),
            params: jest.fn()
        } as unknown as Request

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            sendStatus: jest.fn(),
        }

        container.reset()
        container.register<BooksService>(BooksService, { useValue: mockBooksService })

        booksController = container.resolve(BooksController)
        booksList = booksArray
    })


    describe('getBooks', () => {
        it('should return existing books', async () => {
            mockBooksService.getBooks.mockResolvedValueOnce(booksList)
            mockRequest.query = {}

            await booksController.getBooks(mockRequest as Request, mockResponse as Response)

            const [results] = (mockResponse.json as jest.Mock)?.mock?.calls[0]

            expect(mockResponse.status).toHaveBeenCalledWith(200)
            expect(mockResponse.json).toHaveBeenCalled()
            expect(results).toEqual(booksList)
        })

        it('should throw an error on get books request', async () => {
            mockBooksService.getBooks.mockRejectedValueOnce(new Error('Some error'))
            mockRequest.query = {}

            await expect(
                booksController.getBooks(mockRequest as Request, mockResponse as Response)
            ).rejects.toThrow('Some error')
        })

        it('should fail on get books request query params schema validation', async () => {
            mockRequest.query = { test: 'fail' }
            await booksController.getBooks(mockRequest as Request, mockResponse as Response)

            const [result] = (mockResponse.json as jest.Mock)?.mock?.calls[0]

            expect(mockResponse.status).toHaveBeenCalledWith(403)
            expect(mockResponse.json).toHaveBeenCalled()
            expect(result).toEqual([{
                code: 'unrecognized_keys',
                keys: ['test'],
                path: [],
                message: "Unrecognized key(s) in object: 'test'"
            }])
        })

        it('should fail on get books response schema validation', async () => {
            const bookToGet = { ...booksList[0] }
            bookToGet.test = true

            mockBooksService.getBooks.mockResolvedValueOnce([bookToGet])
            mockRequest.query = {}
            await booksController.getBooks(mockRequest as Request, mockResponse as Response)

            const [result] = (mockResponse.json as jest.Mock)?.mock?.calls[0]

            expect(mockResponse.status).toHaveBeenCalledWith(400)
            expect(mockResponse.json).toHaveBeenCalled()
            expect(result).toEqual({ error: 'Response validation failed' })
        })
    })

    describe('createBook', () => {
        it('should create book', async () => {
            const bookToCreate = { ...booksList[0] }
            mockBooksService.createBook.mockResolvedValueOnce(bookToCreate)

            mockRequest.body = {
                title: bookToCreate.title,
                authors: bookToCreate.authors,
                price: bookToCreate.price,
                category: bookToCreate.category,
                description: bookToCreate.description,
                imageUrl: bookToCreate.imageUrl
            }

            await booksController.createBook(mockRequest as Request, mockResponse as Response)

            const [results] = (mockResponse.json as jest.Mock)?.mock?.calls[0]

            expect(mockResponse.status).toHaveBeenCalledWith(201)
            expect(mockResponse.json).toHaveBeenCalled()
            expect(results).toEqual(bookToCreate)
        })

        it('should throw an error on create book request', async () => {
            const bookToCreate = { ...booksList[0] }
            mockBooksService.createBook.mockRejectedValueOnce(new Error('Some error'))

            mockRequest.body = {
                title: bookToCreate.title,
                authors: bookToCreate.authors,
                price: bookToCreate.price,
                category: bookToCreate.category,
                description: bookToCreate.description,
                imageUrl: bookToCreate.imageUrl
            }

            await expect(
                booksController.createBook(mockRequest as Request, mockResponse as Response)
            ).rejects.toThrow('Some error')
        })

        it('should fail on create book request body schema validation', async () => {
            const bookToCreate = { ...booksList[0] }
            mockBooksService.createBook.mockResolvedValueOnce(bookToCreate)

            mockRequest.body = {
                title: bookToCreate.title,
                authors: bookToCreate.authors,
                price: bookToCreate.price,
                category: bookToCreate.category,
                description: bookToCreate.description,
                imageUrl: bookToCreate.imageUrl,
                test: true
            }

            await booksController.createBook(mockRequest as Request, mockResponse as Response)

            const [result] = (mockResponse.json as jest.Mock)?.mock?.calls[0]

            expect(mockResponse.status).toHaveBeenCalledWith(403)
            expect(mockResponse.json).toHaveBeenCalled()
            expect(result).toEqual([{
                code: 'unrecognized_keys',
                keys: ['test'],
                path: [],
                message: "Unrecognized key(s) in object: 'test'"
            }])
        })

        it('should fail on create book response schema validation', async () => {
            const bookToCreate = { ...booksList[0] }
            bookToCreate.test = true
            mockBooksService.createBook.mockResolvedValueOnce(bookToCreate)

            mockRequest.body = {
                title: bookToCreate.title,
                authors: bookToCreate.authors,
                price: bookToCreate.price,
                category: bookToCreate.category,
                description: bookToCreate.description,
                imageUrl: bookToCreate.imageUrl,
            }

            await booksController.createBook(mockRequest as Request, mockResponse as Response)

            const [result] = (mockResponse.json as jest.Mock)?.mock?.calls[0]

            expect(mockResponse.status).toHaveBeenCalledWith(400)
            expect(mockResponse.json).toHaveBeenCalled()
            expect(result).toEqual({ error: 'Response validation failed' })
        })
    })

    describe('updateBook', () => {
        it('should update book', async () => {
            const bookToUpdate = { ...booksList[0] }

            mockBooksService.updateBook.mockResolvedValueOnce(bookToUpdate)
            mockRequest.params = {
                id: bookToUpdate.uuid
            }
            mockRequest.body = {
                title: bookToUpdate.title,
                authors: bookToUpdate.authors,
                price: bookToUpdate.price,
                category: bookToUpdate.category,
                description: bookToUpdate.description,
            }

            await booksController.updateBook(mockRequest as Request, mockResponse as Response)

            const [results] = (mockResponse.json as jest.Mock)?.mock?.calls[0]

            expect(mockResponse.status).toHaveBeenCalledWith(201)
            expect(mockResponse.json).toHaveBeenCalled()
            expect(results).toEqual(bookToUpdate)
        })

        it('should throw an error on update book request', async () => {
            const bookToUpdate = { ...booksList[0] }

            mockBooksService.updateBook.mockRejectedValue(new Error('Some error'))
            mockRequest.params = {
                id: bookToUpdate.uuid
            }
            mockRequest.body = {
                title: bookToUpdate.title,
                authors: bookToUpdate.authors,
                price: bookToUpdate.price,
                category: bookToUpdate.category,
                description: bookToUpdate.description,
            }

            await expect(
                booksController.updateBook(mockRequest as Request, mockResponse as Response)
            ).rejects.toThrow('Some error')
        })

        it('should fail on update book request id param schema validation', async () => {
            const bookToUpdate = { ...booksList[0] }

            mockBooksService.updateBook.mockResolvedValueOnce(bookToUpdate)
            mockRequest.params = {
                id: 'test-id'
            }
            mockRequest.body = {
                title: bookToUpdate.title,
                authors: bookToUpdate.authors,
                price: bookToUpdate.price,
                category: bookToUpdate.category,
                description: bookToUpdate.description,
            }

            await booksController.updateBook(mockRequest as Request, mockResponse as Response)

            const [result] = (mockResponse.json as jest.Mock)?.mock?.calls[0]

            expect(mockResponse.status).toHaveBeenCalledWith(403)
            expect(mockResponse.json).toHaveBeenCalled()
            expect(result).toEqual([{ code: 'custom', message: 'Invalid input', path: ['id'] }])
        })

        it('should fail on update book request body schema validation', async () => {
            const bookToUpdate = { ...booksList[0] }

            mockBooksService.updateBook.mockRejectedValue(bookToUpdate)
            mockRequest.params = {
                id: bookToUpdate.uuid
            }
            mockRequest.body = {
                title: bookToUpdate.title,
                authors: bookToUpdate.authors,
                price: bookToUpdate.price,
                category: bookToUpdate.category,
                description: bookToUpdate.description,
                test: true
            }

            await booksController.updateBook(mockRequest as Request, mockResponse as Response)

            const [result] = (mockResponse.json as jest.Mock)?.mock?.calls[0]

            expect(mockResponse.status).toHaveBeenCalledWith(403)
            expect(mockResponse.json).toHaveBeenCalled()
            expect(result).toEqual([{
                code: 'unrecognized_keys',
                keys: ['test'],
                path: [],
                message: "Unrecognized key(s) in object: 'test'"
            }])
        })

        it('should fail on update books response schema validation', async () => {
            const bookToUpdate = { ...booksList[0] }
            bookToUpdate.test = true

            mockBooksService.updateBook.mockResolvedValueOnce(bookToUpdate)
            mockRequest.params = {
                id: bookToUpdate.uuid
            }
            mockRequest.body = {
                title: bookToUpdate.title,
                authors: bookToUpdate.authors,
                price: bookToUpdate.price,
                category: bookToUpdate.category,
                description: bookToUpdate.description,
            }

            await booksController.updateBook(mockRequest as Request, mockResponse as Response)

            const [result] = (mockResponse.json as jest.Mock)?.mock?.calls[0]

            expect(mockResponse.status).toHaveBeenCalledWith(400)
            expect(mockResponse.json).toHaveBeenCalled()
            expect(result).toEqual({ error: 'Response validation failed' })
        })
    })

    describe('deleteBook', () => {
        it('should delete book', async () => {
            const bookToDelete = { ...booksList[0] }

            mockBooksService.deleteBook.mockResolvedValueOnce(bookToDelete)
            mockRequest.params = {
                id: bookToDelete.uuid
            }

            await booksController.deleteBook(mockRequest as Request, mockResponse as Response)
            expect(mockResponse.sendStatus).toHaveBeenCalledWith(204)

        })

        it('should throw an error on delete book request', async () => {
            const bookToDelete = { ...booksList[0] }

            mockBooksService.deleteBook.mockRejectedValue(new Error('Some error'))
            mockRequest.params = {
                id: bookToDelete.uuid
            }

            await expect(
                booksController.deleteBook(mockRequest as Request, mockResponse as Response)
            ).rejects.toThrow('Some error')
        })

        it('should fail on delete book request id param schema validation', async () => {
            mockRequest.params = {
                id: 'test-id'
            }

            await booksController.deleteBook(mockRequest as Request, mockResponse as Response)

            const [result] = (mockResponse.json as jest.Mock)?.mock?.calls[0]

            expect(mockResponse.status).toHaveBeenCalledWith(403)
            expect(mockResponse.json).toHaveBeenCalled()
            expect(result).toEqual([{ code: 'custom', message: 'Invalid input', path: ['id'] }])
        })

        it('should fail on delete books response schema validation', async () => {
            const bookToUpdate = { ...booksList[0] }
            bookToUpdate.test = true

            mockBooksService.deleteBook.mockResolvedValueOnce(bookToUpdate)
            mockRequest.params = {
                id: bookToUpdate.uuid
            }

            await booksController.deleteBook(mockRequest as Request, mockResponse as Response)

            const [result] = (mockResponse.json as jest.Mock)?.mock?.calls[0]

            expect(mockResponse.status).toHaveBeenCalledWith(400)
            expect(mockResponse.json).toHaveBeenCalled()
            expect(result).toEqual({ error: 'Response validation failed' })
        })
    })
})