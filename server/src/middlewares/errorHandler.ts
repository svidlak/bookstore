import {NextFunction, Request, Response} from 'express'
import logger from '../utils/logger'

const errorHandler = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
    const { message, stack } = error
    logger.error(message)

    if(!res.headersSent) {
        res.status(500).send('Internal server error')
    }
}

export default errorHandler