import rateLimit from 'express-rate-limit';

const requestRateLimit = rateLimit({
    windowMs: 60000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

export default requestRateLimit;