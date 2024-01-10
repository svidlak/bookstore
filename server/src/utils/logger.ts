import winston, { transports, format } from 'winston'

const logger = winston.createLogger({
    format: format.combine(
        format.errors({ stack: true }),
        format.colorize(),
        format.simple()
    ),
    transports: [
        new transports.Console()
    ]
})

export default logger