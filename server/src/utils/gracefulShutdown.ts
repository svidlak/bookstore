import { Server } from "http"
import logger from "./logger"

const gracefulShutdown = (server: Server): void => {
    ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach( signal => {
        process.on(signal, () => {
            server.close(() => {
                logger.info('HTTP server is closing...')
            })
        })
    })
}

export default gracefulShutdown