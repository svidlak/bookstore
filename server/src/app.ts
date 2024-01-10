import 'reflect-metadata';

import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { PORT } from './configs/environment';

import logger from './utils/logger';
import imageUploader from './utils/imageUploader';

import errorHandler from './middlewares/errorHandler';
import requestRateLimit from './middlewares/requestRateLimit';
import routeNotFound from './middlewares/routeNotFound';

import { BooksRoutes, CategoriesRoutes } from './modules/routes';
import gracefulShutdown from './utils/gracefulShutdown';

const app = express();
const port = PORT || 3000;
const apiPrefix = '/api/v1';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('short'));
app.use(bodyParser.json())
app.use(requestRateLimit)

app.use(apiPrefix, BooksRoutes);
app.use(apiPrefix, CategoriesRoutes);

app.post(`${apiPrefix}/upload`, imageUploader.single('photo'), (req, res) => {
    if (!req.file) {
        logger.warn('Failed to upload image');
        return res.sendStatus(400);
    }

    res.status(200).json({ imageUrl: `/images/${req.file.filename}` });
});

app.use(routeNotFound);
app.use(errorHandler);

const server = app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
});

gracefulShutdown(server)
